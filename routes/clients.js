const express = require("express");
const router = express.Router({ mergeParams: true });
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const sessionConfig = require("../utils/sessionconfig");
const Client = require("../models/clients");
const {
  clientSignUpForm,
  clientSignUp,
  clientLoginForm,
  clientLogin,
  clientLogout,
} = require("../controllers/clients");

router.use(session(sessionConfig));
router.use(flash());

// router.use(passport.initialize());
// router.use(passport.session());

//Using passport for auth
passport.use("clientLocal", new LocalStrategy(Client.authenticate()));

passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());

router.get("/signup", clientSignUpForm);

router.post("/signup", clientSignUp);

router.get("/login", clientLoginForm);

router.post(
  "/login",
  passport.authenticate("clientLocal", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  clientLogin
);

router.get("/logout", clientLogout);

module.exports = router;
