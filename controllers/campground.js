const Campground = require("../models/campground");
const Patner = require("../models/patners");
const Client = require("../models/clients");

module.exports.viewCamps = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds, title: "Campgrounds" });
};
module.exports.addCampForm = (req, res) => {
  res.render("campgrounds/new", { title: "New Campground" });
};

module.exports.addCamp = async (req, res) => {
  const { title, location, price, description } = req.body.campground;
  const ownerId = req.session.isPatner._id;
  const newCamp = Campground({
    title,
    location,
    price,
    description,
    author: ownerId,
  });
  await newCamp.save();
  req.flash("success", "CampGround Successfuly Added");
  res.redirect("/campgrounds");
};

module.exports.viewCamp = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("author");
  //   console.log(req.session);
  res.render("campgrounds/show", {
    campground,
    title: campground.title,
  });
};

module.exports.editCampForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground, title: "Edit Camp" });
};

module.exports.editCamp = async (req, res) => {
  const { id } = req.params;
  const { title, location, price, description } = req.body.campground;
  const campground = await Campground.findByIdAndUpdate(
    id,
    { title, location, price, description },
    { new: true }
  );
  res.render("campgrounds/show", { campground, title: "Edit Camp" });
};

module.exports.deleteCamp = async (req, res) => {
  const { id } = req.params;
  const authId = req.session.isPatner._id;
  const author = await Patner.findById(authId);
  const delAuth = author.campgrounds.filter((c) => c._id != id);
  author.campgrounds = delAuth;
  await author.save();
  await Campground.findByIdAndDelete(id);
  req.flash("success", "You have successfuly deleted the Campground!");
  res.redirect("/campgrounds");
};
