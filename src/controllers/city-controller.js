const { CityService } = require("../services");
const { asyncHandler } = require("../middlewares");
const { SuccessResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

/**
 * POST : /
 * req-body {name:"Kathmandu"}
 */
const createCity = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const city = await CityService.createCity({
    name,
  });
  SuccessResponse.data = city;
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
});

/**
 * DELETE : /:id
 * req-body {}
 */
const deleteCity = asyncHandler(async (req, res) => {
  const city = await CityService.deleteCity(req.params.id);
  SuccessResponse.data = city;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

/**
 * PATCH : /:id
 * req-body {name:"London"}
 */
const updateCity = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const city = await CityService.updateCity(req.params.id, {
    name,
  });
  SuccessResponse.data = city;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

/**
 * GET : /
 * req-body {}
 */
const getCities = asyncHandler(async (req, res) => {
  const cities = await CityService.getCities();
  SuccessResponse.data = cities;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

/**
 * GET : /:id
 * req-body {}
 */
const getCity = asyncHandler(async (req, res) => {
  const city = await CityService.getCity(req.params.id);
  SuccessResponse.data = city;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

module.exports = {
  createCity,
  deleteCity,
  updateCity,
  getCities,
  getCity,
};
