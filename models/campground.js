const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reviews = require("./reviews");
const Patners = require("./patners");

//Create the campgound schema after destructuring the schema variable from the mongoose module.
const CampgroundSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Patner",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
    },
  ],
});

//deleting anything that comes with a campground through a middleware
CampgroundSchema.post("findOneAndDelete", async function (camp) {
  if (camp) {
    await Reviews.deleteMany({
      _id: {
        $in: camp.reviews,
      },
    });
  }
});

//Export the model directly
module.exports = mongoose.model("Campground", CampgroundSchema);
