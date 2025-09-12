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
  arrivalTime: Joi.date()
    .required()
    .messages({
      "date.base": "Arrival time must be a date",
      "any.required": "Arrival time is required",
      "date.empty": "Arrival time cannot be empty",
    })
    .custom((value, helpers) => {
      const { departureTime } = helpers.state.ancestors[0];
      if (new Date(value).getTime() <= new Date(departureTime).getTime()) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid": "Arrival time must be later than departure time",
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

const flightUpdateSchema = Joi.object({
  seats: Joi.number().positive().required().messages({
    "number.base": "Seats must be a number",
    "any.required": "Seats is required",
    "number.empty": "Seats cannot be empty",
    "number.positive": "Seats must be greater than 0",
  }),
});
// Middleware
function validateUpdateRequest(req, res, next) {
  const { error, value } = flightUpdateSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => FormatMessage(detail.message));
    ErrorResponse.message = "Something went wrong while updating seats";
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
