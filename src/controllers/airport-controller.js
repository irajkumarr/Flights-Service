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

/**
 * DELETE : /
 * req-body {}
 */
const deleteAirport = asyncHandler(async (req, res) => {
  const airport = await AirportService.deleteAirport(req.params.id);
  SuccessResponse.data = airport;
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
});

/**
 * PATCH : /:id
 * req-body {name:"Bharatpur Airport",code:"BA",cityId:4,address:"Chitwan"}
 */
const updateAirport = asyncHandler(async (req, res) => {
  const { name, code, city, address } = req.body;
  const airport = await AirportService.updateAirport(req.params.id, {
    name,
    code,
    city,
    address,
  });
  SuccessResponse.data = airport;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  deleteAirport,
  updateAirport,
};
