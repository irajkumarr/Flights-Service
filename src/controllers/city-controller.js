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

module.exports = {
  createCity,
};
