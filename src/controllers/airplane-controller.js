const { AirplaneService } = require("../services");
const { asyncHandler } = require("../middlewares");
const { SuccessResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

/**
 * POST : /
 * req-body {modelNumber: "airbusa260", capacity: 220}
 */
const createAirplane = asyncHandler(async (req, res) => {
  const { modelNumber, capacity } = req.body;
  const airplane = await AirplaneService.createAirplane({
    modelNumber,
    capacity,
  });
  SuccessResponse.data = airplane;
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
});

/**
 * GET : /
 * req-body {}
 */
const getAirplanes = asyncHandler(async (req, res) => {
  const airplanes = await AirplaneService.getAirplanes();
  SuccessResponse.data = airplanes;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

module.exports = {
  createAirplane,
  getAirplanes,
};
