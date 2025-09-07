const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils");
const { FormatMessage } = require("../utils");

// Define schema
const airplaneSchema = Joi.object({
  modelNumber: Joi.string().required().messages({
    "any.required": "Model number is required",
    "string.empty": "Model number cannot be empty",
  }),
  capacity: Joi.number().positive().messages({
    "number.base": "Capacity must be a number",
    "number.positive": "Capacity must be greater than 0",
  }),
});

// Middleware
function validateCreateRequest(req, res, next) {
  const { error, value } = airplaneSchema.validate(req.body, {
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

module.exports = {
  validateCreateRequest,
};
