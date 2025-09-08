const express = require("express");
const { AirportController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

const router = express.Router();

// api/v1/airports  POST
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

module.exports = router;
