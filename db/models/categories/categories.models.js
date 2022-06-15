import Joi from "joi";

const categoriesValidationSchema = Joi.object({
  id: Joi.string().alphanum().required().trim(),
  name: Joi.string().alphanum().required().trim(),
  color: Joi.string().required().trim(),
  createdAt: Joi.date().iso().required(),
  updatedAt: Joi.date().iso().required(),
});
