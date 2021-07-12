import Joi from "joi";
import { errorResponse } from "../helpers/responseUtil";

export const createNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().trim().required().min(2),
  });
  const { content } = req.body;

  const { error } = schema.validate({
    content,
  });
  if (error) {
    const { details } = error;
    return errorResponse(res, 422, "content is required", null);
  }

  return next();
};

export const validateParam = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().alphanum().required(),
  });
  const { id } = req.params;
  const { error } = schema.validate({ id });
  if (error) {
    const { details } = error;
    return errorResponse(res, 422, details[0].message);
  }

  return next();
};
