const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const clientSchema = Schema({
  email: String,
  contactNo: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
    },
  ],
});

clientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Client", clientSchema);
