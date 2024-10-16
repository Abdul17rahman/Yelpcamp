// const Client = require("./models/clients");
// const Patner = require("./models/patners");

module.exports.isPatnerLoggedIn = async (req, res, next) => {
  if (!req.session.isPatner) {
    req.flash("error", "You have no access to continue!");
    return res.redirect("/campgrounds");
  }
  next();
};

module.exports.isUserLoggedIn = async (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "You need to login to continue!");
    return res.redirect("/login");
  }
  next();
};
// module.exports.isLoggedIn = (req, res, next) => {
//   if (!req.session.user) {
//     req.flash("error", "You Must be logged In to continue");
//     return res.redirect("/campgrounds");
//   }
//   const userId = req.session.user._id;
//   const foundUser = await Client.findById(userId);
//   if (!foundUser) {
//     req.session.userRole = "Patner";
//   }
//   req.session.userRole = "Client";
//   console.log(req.session.userRole);
//   next();
// };

// module.exports.myRole = async (id) => {
//   const foundUser = await Patner.findById(id);
//   if (!foundUser) {
//     return "Client";
//   }
//   return "Patner";
// };

// module.exports.checkRole = async(req,res,next)=>{
//   const userId = req.session.user._id;
//   const foundUser = await Client.findById(userId);
//   if(foundUser){

//   }
// }

// module.exports.isPermitted = async (req, res) => {
//   try {
//     const patnerID = req.session.user._id;
//     const foundPatner = await Patner.findById(patnerID);
//     if (!foundPatner) {
//       return (req.session.role = "");
//     }
//     return (req.session.role = "Permitted");
//   } catch (err) {
//     return err;
//   }
// };

// module.exports.isUserLoggedIn = async (req, res, next) => {
//   if (req.session.userID) {
//     const { userID } = req.session;
//     const foundUser = await User.findById(userID);
//     if (!foundUser) {
//       req.flash("error", "You have no access here");
//       return res.redirect("/campgrounds");
//     }
//     next();
//   } else {
//     req.flash("error", "You Must be logged In as a User");
//     res.redirect("/campgrounds");
//   }
// };
