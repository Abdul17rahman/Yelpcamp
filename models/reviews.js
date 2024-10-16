const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewScehma = new Schema({
  rating: Number,
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
});

const Reviews = mongoose.model("Reviews", reviewScehma);

module.exports = Reviews;
