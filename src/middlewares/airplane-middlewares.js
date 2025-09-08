const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils");
const { FormatMessage } = require("../utils");

// Define schema
const airplaneCreateSchema = Joi.object({
  modelNumber: Joi.string().required().messages({
    "any.required": "Model number is required",
    "string.empty": "Model number cannot be empty",
  }),
  capacity: Joi.number().positive().max(1000).messages({
    "number.base": "Capacity must be a number",
    "number.max": "Capacity cannot exceed 1000",
    "number.positive": "Capacity must be greater than 0",
  }),
});

// Middleware
function validateCreateRequest(req, res, next) {
  const { error, value } = airplaneCreateSchema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const errors = error.details.map((detail) => FormatMessage(detail.message));
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  req.body = value;
  next();
}

const airplaneUpdateSchema = Joi.object({
  capacity: Joi.number().positive().max(1000).messages({
    "number.base": "Capacity must be a number",
    "number.max": "Capacity cannot exceed 1000",
    "number.positive": "Capacity must be greater than 0",
  }),
});
// Middleware
function validateUpdateRequest(req, res, next) {
  const { error, value } = airplaneUpdateSchema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const errors = error.details.map((detail) => FormatMessage(detail.message));
    ErrorResponse.message = "Something went wrong while updating airplane";
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
