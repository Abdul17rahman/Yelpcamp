const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const Patner = require("../models/patners");

//Connect to mongo db
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

//Get a Random element from an Array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const authorId = [
  "61f7cf3cb772b96a376dc9b0",
  "61ff9a72efeb8d08cc371e6f",
  "61ff9aaaefeb8d08cc371e7c",
  "61ff9ae9efeb8d08cc371e80",
];

//Create a seed method to fill our database with some data.
const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const rand = Math.floor(Math.random() * 4);
    const getID = () => {
      for (let id = 0; id < authorId.length; id++) {
        return authorId[rand];
      }
    };
    const createdAuthor = getID();
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price,
      image: `https://source.unsplash.com/random/300x200?sig=${
        Math.floor(Math.random() * 100) + 1
      }`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint dolorem ipsum repudiandae rerum officiis cum vero nobis eligendi quo porro?",
      author: createdAuthor,
    });
    const owner = await Patner.findById(createdAuthor);
    owner.campgrounds.push(camp);

    await owner.save();
    await camp.save();
    console.log(camp);
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
