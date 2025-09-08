const { AirportService } = require("../services");
const { asyncHandler } = require("../middlewares");
const { SuccessResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

/**
 * POST : /
 * req-body {name: "Bharatpur Airport", code: "BA","cityId":2}
 */
const createAirport = asyncHandler(async (req, res) => {
  const { name, code, address, cityId } = req.body;
  const airport = await AirportService.createAirport({
    name,
    code,
    address,
    cityId,
  });
  SuccessResponse.data = airport;
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
});

/**
 * GET : /
 * req-body {}
 */
const getAirports = asyncHandler(async (req, res) => {
  const airports = await AirportService.getAirports();
  SuccessResponse.data = airports;
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
});

/**
 * GET : /
 * req-body {}
 */
const getAirport = asyncHandler(async (req, res) => {
  const airport = await AirportService.getAirport(req.params.id);
  SuccessResponse.data = airport;
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
});

module.exports = {
  createAirport,
  getAirports,
  getAirport,
};
