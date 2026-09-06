const express = require("express");
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");
const flightRoutes = require("./flight-routes");

const router = express.Router();

router.get("/health", (req, res) => {
  return res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);

module.exports = router;

