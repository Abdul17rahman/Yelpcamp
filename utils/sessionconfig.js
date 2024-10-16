//Session config constant.
const sessionConfig = {
  secret: "thisisasceret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
};

module.exports = sessionConfig;
