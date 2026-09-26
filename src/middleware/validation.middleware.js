import { BadRequestException } from "../common/exceptions/errors.exceptions.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      throw BadRequestException({
        message: "Validation error",
        extra: validationResult.error.issues,
      });
    }

    req.validate = validationResult.data;
    next();
  };
};
