const Patner = require("../models/patners");

module.exports.regPatnerForm = (req, res) => {
  res.render("patners/register", { title: "Patner's Registration" });
};

module.exports.regPatner = async (req, res) => {
  const { username, password, email, contact } = req.body.Patner;
  const pat = Patner({ username, email, contact });
  const regPat = await Patner.register(pat, password);
  req.flash("success", "Successfully signed up, Please login here!");
  res.redirect("/patner's_login");
};

module.exports.patnerLoginForm = (req, res) => {
  res.render("patners/login", { title: "Patner's login" });
};

module.exports.patnerLogin = async (req, res) => {
  req.session.isPatner = req.user;
  req.session.userRole = "Patner";
  req.flash("success", "Welcome Back");
  const returnToUrl = req.session.returnTo || "/campgrounds";
  res.redirect("/campgrounds");
};

module.exports.patnerLogout = (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/campgrounds");
};
