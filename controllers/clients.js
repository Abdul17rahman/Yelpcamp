const Client = require("../models/clients");

module.exports.clientSignUpForm = (req, res) => {
  res.render("clients/signup", { title: "SignUp" });
};

module.exports.clientSignUp = async (req, res) => {
  const { username, password, email, contactNo } = req.body;
  const client = Client({ username, email, contactNo });
  const regClient = await Client.register(client, password);
  req.flash("success", "Successfully signed up, Please login here!");
  res.redirect("/login");
};

module.exports.clientLoginForm = (req, res) => {
  res.render("clients/login", { title: "Login" });
};

module.exports.clientLogin = async (req, res) => {
  req.session.user = req.user;
  req.session.userRole = "Client";
  req.flash("success", "Welcome Back");
  const returnToUrl = req.session.returnTo || "/campgrounds";
  res.redirect(`${returnToUrl}`);
};

module.exports.clientLogout = (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/campgrounds");
};
