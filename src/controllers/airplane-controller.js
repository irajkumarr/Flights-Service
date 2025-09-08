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

/**
 * GET : /:id
 * req-body {}
 */
const getAirplane = asyncHandler(async (req, res) => {
  const airplane = await AirplaneService.getAirplane(req.params.id);
  SuccessResponse.data = airplane;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

/**
 * DELETE : /:id
 * req-body {}
 */
const deleteAirplane = asyncHandler(async (req, res) => {
  const airplane = await AirplaneService.deleteAirplane(req.params.id);
  SuccessResponse.data = airplane;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

/**
 * PATCH : /:id
 * req-body {capacity:444}
 */
const updateAirplane = asyncHandler(async (req, res) => {
  const { capacity } = req.body;
  const airplane = await AirplaneService.updateAirplane(req.params.id, {
    capacity,
  });
  SuccessResponse.data = airplane;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  deleteAirplane,
  updateAirplane,
};
