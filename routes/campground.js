const express = require("express");
const router = express.Router({ mergeParams: true });
const session = require("express-session");
const flash = require("connect-flash");
const { campgroundSchema } = require("../schemas");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/appError");
const sessionConfig = require("../utils/sessionconfig");
const { isPatnerLoggedIn } = require("../middleware");
const {
  viewCamps,
  addCampForm,
  addCamp,
  viewCamp,
  editCampForm,
  editCamp,
  deleteCamp,
} = require("../controllers/campground");

//Session and flash
router.use(session(sessionConfig));
router.use(flash());

//Middleware for schema validator
const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message);
    throw new AppError(400, msg);
  } else {
    next();
  }
};

//Get all Campgrounds and adding a campgroud with post request
router
  .route("/campgrounds")
  .get(wrapAsync(viewCamps))
  .post(isPatnerLoggedIn, validateCampground, wrapAsync(addCamp));

//Adding a campground. /campgrounds/new.
router.get("/campgrounds/new", isPatnerLoggedIn, addCampForm);

//Displaying a single CampGround---Shows page,edit Page and delete.
router
  .route("/campgrounds/:id")
  .get(wrapAsync(viewCamp))
  .put(isPatnerLoggedIn, validateCampground, wrapAsync(editCamp))
  .delete(isPatnerLoggedIn, wrapAsync(deleteCamp));

//Edit Campgrounds
router.get("/campgrounds/:id/edit", isPatnerLoggedIn, wrapAsync(editCampForm));

module.exports = router;
