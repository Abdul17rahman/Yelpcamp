if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log(process.env.MYSECRET);

const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const AppError = require("./utils/appError");
const campgroundRouter = require("./routes/campground");
const reviewsRouter = require("./routes/review");
const clientRouter = require("./routes/clients");
const patnerRouter = require("./routes/patners");
const sessionConfig = require("./utils/sessionconfig");
// const { isPatner, isPermitted } = require("./middleware");

//Connect to mongo db
mongoose.connect("mongodb://0.0.0.0:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

//Set a templating layout engine
app.engine("ejs", engine);

//Setting the views directories.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middlewares for using session and flash to flash messages.
app.use(session(sessionConfig));
app.use(flash());

//Use the middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//Using Passport for Auth
app.use(passport.initialize());
app.use(passport.session());

//Flash middlware for global response variables
app.use((req, res, next) => {
  //Return you back to the original URL
  if (
    !["/login", "/", "/patner_login", "signup", "reg_patner"].includes(
      req.originalUrl
    )
  ) {
    req.session.returnTo = req.originalUrl;
    // console.log(req.session.returnTo);
  }
  res.locals.userRole = req.session.userRole || "Visitor";
  res.locals.currentUser = req.session.user || req.session.isPatner;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// app.get("/", (req, res) => {
//   res.render("home");
// });

//campground routes.
app.use("/", campgroundRouter);

//Reviews routes.
app.use("/", reviewsRouter);

//Client's Routes
app.use("/", clientRouter);

// //User's Routes
app.use("/", patnerRouter);

//Route for all other comments
app.all("*", (req, res, next) => {
  next(new AppError("400", "Page not found!"));
});

// Handling the 404 error with a middleware.
app.use((err, req, res, next) => {
  // const { status = 500, message = "something Went Wrong" } = err;
  if (!err.message) err.message = "Sorry, Something Went Wrong";
  res.render("error", { err, title: "Error Page" });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
