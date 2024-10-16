const Joi = require("joi");

const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().min(3).max(25),
    price: Joi.number().required().min(1),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    text: Joi.string().required(),
  }).required(),
});

const userSchema = Joi.object({
  User: Joi.object({
    email: Joi.string().required(),
    contact: Joi.number().required(),
  }).required(),
});

module.exports = {
  campgroundSchema,
  reviewSchema,
  userSchema,
};
