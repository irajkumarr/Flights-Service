const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const { AppError } = require("../utils");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create({ data });
    return airport;
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
      "Something went wrong while creating airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    if (airports.length == 0) {
      throw new AppError(
        "No airports found in the database",
        StatusCodes.NOT_FOUND
      );
    }
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(Number(id));
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirport(id) {
  try {
    const airport = await airportRepository.delete(Number(id));
    return airport;
  } catch (error) {
    if (error.name === "PrismaClientKnownRequestError") {
      throw new AppError(
        "The airport you requested to delete is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(Number(id), data);
    return airport;
  } catch (error) {
    if (error.name === "PrismaClientKnownRequestError") {
      throw new AppError(
        "The airport you requested to update is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  deleteAirport,updateAirport
};
