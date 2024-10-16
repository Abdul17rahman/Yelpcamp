const Reviews = require("../models/reviews");
const Campground = require("../models/campground");
const Client = require("../models/clients");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const author = req.session.user;
  const { rating, text } = req.body.review;
  // console.log(rating, text);
  const campReview = await Campground.findById(id);
  const newReview = Reviews({ rating, text, author: author._id });
  campReview.reviews.push(newReview);
  const authReview = await Client.findById(author._id);
  authReview.reviews.push(newReview);
  await newReview.save();
  await campReview.save();
  await authReview.save();
  req.flash("success", `Review successfuly added on ${campReview.title}!`);
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, rid } = req.params;
  console.log(rid);
  const user = req.session.user._id;
  const delRev = await Client.findById(user);
  const deletedRev = delRev.reviews.filter((r) => r._id != rid);
  delRev.reviews = deletedRev;
  await delRev.save();
  await Reviews.findByIdAndDelete(rid);
  // console.log(req.session.user);
  req.flash("success", "Review successfuly deleted!");
  res.redirect(`/campgrounds/${id}`);
};
