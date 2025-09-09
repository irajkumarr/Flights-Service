const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils");
const { FormatMessage } = require("../utils");

// Define schema
const flightCreateSchema = Joi.object({
  flightNumber: Joi.string().required().messages({
    "any.required": "Flight number is required",
    "string.empty": "Flight number cannot be empty",
    "string.base": "Flight number must be a string",
  }),
  airplaneId: Joi.number().required().positive().messages({
    "number.base": "Airplane id must be a number",
    "any.required": "Airplane id is required",
    "number.empty": "Airplane id cannot be empty",
    "number.positive": "Airplane id must be greater than 0",
  }),
  departureAirportId: Joi.string().required().messages({
    "string.base": "Departure airport must be a string",
    "any.required": "Departure airport is required",
    "string.empty": "Departure airport cannot be empty",
  }),
  arrivalAirportId: Joi.string().required().messages({
    "string.base": "Arrival airport must be a string",
    "any.required": "Arrival airport is required",
    "string.empty": "Arrival airport cannot be empty",
  }),
  departureTime: Joi.date().required().messages({
    "date.base": "Departure time must be a date",
    "any.required": "Departure time is required",
    "date.empty": "Departure time cannot be empty",
  }),
  arrivalTime: Joi.date().required().messages({
    "date.base": "Arrival time must be a date",
    "any.required": "Arrival time is required",
    "date.empty": "Arrival time cannot be empty",
  }),
  price: Joi.number().required().positive().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
    "number.empty": "Price cannot be empty",
    "number.positive": "Price must be greater than 0",
  }),
  boardingGate: Joi.string().messages({
    "string.base": "Boarding gate must be a string",
    "string.empty": "Boarding gate cannot be empty",
  }),
  totalSeats: Joi.number().positive().messages({
     "number.base": "Total seats must be a number",
    "any.required": "Total seats is required",
    "number.empty": "Total seats cannot be empty",
    "number.positive": "Total seats must be greater than 0",
  }),
 
});

// Middleware
function validateCreateRequest(req, res, next) {
  const { error, value } = flightCreateSchema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const errors = error.details.map((detail) => FormatMessage(detail.message));
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  req.body = value;
  next();
}

const airportUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Airport name cannot be empty",
    "string.base": "Airport name must be a string",
  }),
  code: Joi.string().max(20).messages({
    "string.base": "Airport code must be a string",
    "string.max": "Airport code cannot exceed 20",
    "string.empty": "Airport code cannot be empty",
  }),
  address: Joi.string().messages({
    "string.base": "Airport address must be a string",
    "string.empty": "Airport address cannot be empty",
  }),
  cityId: Joi.number().positive().messages({
    "number.base": "Airplane city must be a number",
    "number.positive": "Airplane city must be greater than 0",
    "string.empty": "Airport city cannot be empty",
  }),
});
// Middleware
function validateUpdateRequest(req, res, next) {
  const { error, value } = airportUpdateSchema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const errors = error.details.map((detail) => FormatMessage(detail.message));
    ErrorResponse.message = "Something went wrong while updating airport";
    ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  req.body = value;
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
