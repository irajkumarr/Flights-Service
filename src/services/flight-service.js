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
  let sortFilter = [];
  const endingTripTime = " 23:59:59";
  //trips TIA - LIA
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    if (departureAirportId === arrivalAirportId) {
      throw new AppError(
        "Departure and arrival airports cannot be the same",
        StatusCodes.BAD_REQUEST
      );
    }
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  // price 1000-4500
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-").map(Number);
    customFilter.price = {
      gte: minPrice,
      lte: maxPrice,
    };
  }
  //travellers 2
  if (query.travellers) {
    customFilter.totalSeats = {
      gte: Number(query.travellers),
    };
  }

  // tripDate 2023-03-09
  if (query.tripDate) {
    customFilter.departureTime = {
      gte: new Date(query.tripDate),
      lte: new Date(query.tripDate + endingTripTime),
    };
    console.log(customFilter.departureTime);
  }

  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => {
      const [field, order] = param.split("_");
      return { [field]: order.toLowerCase() };
    });
    sortFilter = sortFilters;
  }

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    if (flights.length == 0) {
      throw new AppError(
        "No flights found in the database",
        StatusCodes.NOT_FOUND
      );
    }
    return flights;
  } catch (error) {
    // console.log(error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(Number(id));
    return flight;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The flight you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      Number(data.flightId),
      data.seats,
      data.dec
    );
    return response;
  } catch (error) {
    // console.log(error);
    throw new AppError(
      "Cannot update data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  updateSeats,
};
