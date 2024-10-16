const express = require("express");
const router = express.Router({ mergeParams: true });
const session = require("express-session");
const sessionConfig = require("../utils/sessionconfig");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Patner = require("../models/patners");
const {
  regPatnerForm,
  regPatner,
  patnerLoginForm,
  patnerLogin,
  patnerLogout,
} = require("../controllers/patners");

router.use(session(sessionConfig));
router.use(flash());

// router.use(passport.initialize());
// router.use(passport.session());

//Using passport for auth
passport.use("patnerLocal", new LocalStrategy(Patner.authenticate()));

passport.serializeUser(Patner.serializeUser());
passport.deserializeUser(Patner.deserializeUser());

router.get("/reg_patner", regPatnerForm);

router.post("/reg_patner", regPatner);

router.get("/patner_login", patnerLoginForm);

router.post(
  "/patner_login",
  passport.authenticate("patnerLocal", {
    failureFlash: true,
    failureRedirect: "/patner_login",
    session: true,
  }),
  patnerLogin
);

router.get("/logout", patnerLogout);

module.exports = router;
