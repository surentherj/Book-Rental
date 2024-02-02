function trimObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "object") {
        obj[key] = trimObject(obj[key]);
      } else if (typeof obj[key] === "string") {
        obj[key] = obj[key].trim();
      }
    }
  }

  return obj;
}

exports.trimRequest = (req, res, next) => {
  req.params = trimObject(req.params);
  req.query = trimObject(req.query);
  req.body = trimObject(req.body);

  next();
};

exports.reqFiltering = (req, res, next) => {
  const maliciousPatterns =
    /<base|<script|<link|<meta|<iframe|<img|<object|<form|<input|<svg|<style|<canvas|<applet|<embed|<marquee|<href/gi; // Regular expression to match "<script" or "<meta"
  if (
    maliciousPatterns.test(
      JSON.stringify({
        reqBody: req?.body,
        queryParam: req?.query,
        pathParms: req?.params,
      })
    )
  ) {
    res.status(400).json({ message: "Malicious request detected." });
  } else {
    next();
  }
};
