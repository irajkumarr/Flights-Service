const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils");
const { FormatMessage } = require("../utils");

// Define schema
const citySchema = Joi.object({
  name: Joi.string().required().max(50).messages({
    "any.required": "City name is required",
    "string.base": "City name must be a string",
    "string.empty": "City name cannot be empty",
    "string.max": "City name cannot exceed more than 50 characters.",
  }),
});

// Middleware
function validateCreateRequest(req, res, next) {
  const { error, value } = citySchema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const errors = error.details.map((detail) => FormatMessage(detail.message));
    ErrorResponse.message = "Something went wrong while creating city";
    ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  req.body = value;
  next();
}

module.exports = {
  validateCreateRequest,
};
