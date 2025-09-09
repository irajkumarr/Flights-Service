const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils");
const { FormatMessage } = require("../utils");

// Define schema
const airportCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Airport name is required",
    "string.empty": "Airport name cannot be empty",
    "string.base": "Airport name must be a string",
  }),
  code: Joi.string().required().max(20).messages({
    "string.base": "Airport code must be a string",
    "any.required": "Airport code is required",
    "string.max": "Airport code cannot exceed 20",
    "string.empty": "Airport code cannot be empty",
  }),
  address: Joi.string().messages({
    "string.base": "Airport address must be a string",
    "string.empty": "Airport address cannot be empty",
  }),
  cityId: Joi.number().required().positive().messages({
    "number.base": "Airplane city must be a number",
    "number.positive": "Airplane city must be greater than 0",
    "any.required": "Airport city is required",
    "string.empty": "Airport city cannot be empty",
  }),
});

// Middleware
function validateCreateRequest(req, res, next) {
  const { error, value } = airportCreateSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => FormatMessage(detail.message));
    ErrorResponse.message = "Something went wrong while creating airport";
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
