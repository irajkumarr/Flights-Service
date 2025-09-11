const { FlightService } = require("../services");
const { asyncHandler } = require("../middlewares");
const { SuccessResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

/**
 * POST : /
 * req-body {
 * flightNumber:"BA-596",
 * airplaneId:1,
 * departureAirportId:"BA",
 * arrivalAirportId:"LIA",
 * arrivalTime:2023-10-27 17:30:00,
 * departureTime:2025-10-27 15:30:00,
 * price:4500,
 * totalSeats:130,
 * }
 */
const createFlight = asyncHandler(async (req, res) => {
  const {
    flightNumber,
    airplaneId,
    departureAirportId,
    arrivalAirportId,
    departureTime,
    arrivalTime,
    price,
    boardingGate,
    totalSeats,
  } = req.body;
  const flight = await FlightService.createFlight({
    flightNumber,
    airplaneId,
    departureAirportId,
    arrivalAirportId,
    departureTime,
    arrivalTime,
    price,
    boardingGate,
    totalSeats,
  });
  SuccessResponse.data = flight;
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
});

/**
 * GET : /
 * req-body {}
 */
const getFlights = asyncHandler(async (req, res) => {
  const flights = await FlightService.getFlights(req.query);
  SuccessResponse.data = flights;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

/**
 * GET : /
 * req-body {}
 */
const getFlight = asyncHandler(async (req, res) => {
  const flight = await FlightService.getFlight(req.params.id);
  SuccessResponse.data = flight;
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
});

/**
 * PATCH : /:id/seats
 * req-body {flightId:1,seats:3}
 */
const updateFlight = asyncHandler(async (req, res) => {
  const { seats, dec } = req.body;
  const flightId = req.params.id;
  const flight = await FlightService.updateSeats({ flightId, seats, dec });
  SuccessResponse.data = flight;
  return res.status(StatusCodes.OK).json(SuccessResponse);
});

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  updateFlight,
};
