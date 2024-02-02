"use strict";

const { trimRequest, reqFiltering } = require("../middleware/validate");
const productRoutes = require("./product.routes");
const userRoutes = require("./user.routes");
const bookRoutes = require("./book.routes");
const cartRoutes = require("./checkout.routes");
const rentalRoutes = require("./rental.routes");

module.exports = (app) => {
  app.use(trimRequest);

  app.use(reqFiltering);

  app.use("/product", productRoutes);

  app.use("/user", userRoutes);

  app.use("/book", bookRoutes);

  app.use("/cart", cartRoutes);

  app.use("/rental", rentalRoutes);
};
