const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const patnerSchema = Schema({
  email: String,
  contact: Number,
  campgrounds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Campground",
    },
  ],
});

patnerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Patner", patnerSchema);
