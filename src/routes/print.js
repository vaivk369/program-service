var express = require("express");
const { buildPDFWithCallback } = require("../service/print/pdf");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/program/v1";

// Refactor this to move to service
async function printPDF(req, res) {
  const id = req.query.id;
  buildPDFWithCallback(id, function (binary, error, errorMsg) {
    if (!error) {
      res.contentType(`application/pdf; name=${id}.pdf`);
      res.send(binary);
    } else {
      res.status(404).send({
        error: errorMsg,
      });
    }
  });
}

module.exports = function (app) {
  app
    .route(BASE_URL + "/print/pdf")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      printPDF
    );
};
