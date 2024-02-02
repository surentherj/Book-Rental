"use strict";

const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const helmet = require("helmet");
const path = require("path");
const http = require("http");
const config = require("../config/config");


module.exports = () => {
  const app = express();

  app.locals.title = config.app.title;
  app.locals.version = config.app.version;
  app.locals.description = config.app.description;
  app.use((req, res, next) => {
    if (config.app.url) {
      app.locals.url = config.app.url + ":" + config.port;
    } else {
      res.locals.url = req.protocol + "://" + req.headers.host + req.url;
    }
    next();
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: true }));

  app.use(methodOverride());

  app.use(helmet({ frameguard: false }));
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable("x-powered-by");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Content-Security-Policy", "script-src 'self'");
    res.removeHeader("X-Frame-Options");
    next();
  });

  require("../routes")(app);
 
  if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "../dist")));
    require("../routes/root.routes")(app);
  }

  let server = http.createServer(app);

  app.set("server", server);

  return app;
};
