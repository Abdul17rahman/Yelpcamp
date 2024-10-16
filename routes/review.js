const express = require("express");
const router = express.Router({ mergeParams: true });
const session = require("express-session");
const flash = require("connect-flash");
const { createReview, deleteReview } = require("../controllers/reviews");
const { reviewSchema } = require("../schemas");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/appError");
const sessionConfig = require("../utils/sessionconfig");
const { isUserLoggedIn } = require("../middleware");

//Session and flash
router.use(session(sessionConfig));
router.use(flash());

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message);
    throw new AppError(400, msg);
  } else {
    next();
  }
};

//Review Routes..........
router.post(
  "/campgrounds/:id/reviews",
  isUserLoggedIn,
  validateReview,
  wrapAsync(createReview)
);

//Delete Review
router.delete(
  "/campgrounds/:id/reviews/:rid",
  isUserLoggedIn,
  wrapAsync(deleteReview)
);

module.exports = router;
