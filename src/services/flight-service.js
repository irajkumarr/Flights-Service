const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create({ data });
    return flight;
  } catch (error) {
    // Unique Constraint error
    if (error.name === "PrismaClientKnownRequestError") {
      throw new AppError(
        "Airport name or code must be unique",
        StatusCodes.CONFLICT
      );
    }
    //validation error
    if (error.name === "PrismaClientValidationError") {
      throw new AppError("Invalid input", StatusCodes.BAD_REQUEST);
    }
    //fallback
    throw new AppError(
      "Something went wrong while creating flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
};
