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

async function getFlights(query) {
  let customFilter = {};
  //trips TIA - LIA
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  // price 1000-4500
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      gte: minPrice,
      lte: maxPrice,
    };
  }

  try {
    const flights = await flightRepository.getAllFlights(customFilter);
    if (flights.length == 0) {
      throw new AppError(
        "No flights found in the database",
        StatusCodes.NOT_FOUND
      );
    }
    return flights;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("No flights found in the database", error.statusCode);
    }
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getFlights,
};
