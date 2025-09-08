const { CityRepository } = require("../repositories");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create({ data });
    return city;
  } catch (error) {
    // Unique Constraint error
    if (error.name === "PrismaClientKnownRequestError") {
      throw new AppError("City name must be unique", StatusCodes.CONFLICT);
    }
    // Validation error
    if (error.name === "PrismaClientValidationError") {
      throw new AppError("Invalid input", StatusCodes.BAD_REQUEST);
    }
    //fallback
    throw new AppError(
      "Something went wrong while creating city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
};
