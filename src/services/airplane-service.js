const { AirplaneRepository } = require("../repositories");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create({ data });
    return airplane;
  } catch (error) {
    // Validation error
    if (error.name === "PrismaClientValidationError") {
      throw new AppError("Invalid input", StatusCodes.BAD_REQUEST);
    }
    //fallback
    throw new AppError(
      "Something went wrong while creating airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  const airplanes = await airplaneRepository.getAll();
  if (airplanes.length == 0) {
    throw new AppError(
      "No airplanes found in the database",
      StatusCodes.NOT_FOUND
    );
  }
  return airplanes;
}

module.exports = {
  createAirplane,
  getAirplanes,
};
