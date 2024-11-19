var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// Router Objects
var indexRouter = require("./routes/index");
var projectsRouter = require("./routes/projects");
var itemsRouter = require("./routes/items"); 
// var usersRouter = require('./routes/users');
// Import MongoDB and Configuration modules
var mongoose = require("mongoose");
var configs = require("./configs/globals");
// HBS Helper Methods
var hbs = require("hbs");
// Import passport and session modules
var passport = require("passport");
var session = require("express-session");
// Import user model
var User = require("./models/user");
// Import Google Strategy
var GoogleStrategy = require("passport-google-oauth20").Strategy;
// Express App Object
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Express Configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configure passport module
app.use(
  session({
    secret: "s2021pr0j3ctTracker",
    resave: false,
    saveUninitialized: false,
  })
);
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Link passport to the user model
passport.use(User.createStrategy());

// Configure Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: configs.Authentication.Google.ClientId,
      clientSecret: configs.Authentication.Google.ClientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in DB
        const user = await User.findOne({ oauthId: profile.id });
        if (user) {
          // Return existing user
          return done(null, user);
        } else {
          // Create new user
          const newUser = new User({
            username: profile.displayName,
            oauthId: profile.id,
            oauthProvider: "Google",
            created: Date.now(),
          });
          // Save new user to DB
          const savedUser = await newUser.save();
          return done(null, savedUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Set passport to write/read user data to/from session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routing Configuration
app.use("/", indexRouter);
app.use("/projects", projectsRouter);
app.use("/items", itemsRouter); 

// Connecting to the DB
mongoose
  .connect(configs.ConnectionStrings.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected Successfully!"))
  .catch((error) => console.log(`Error while connecting: ${error}`));


hbs.registerHelper("createOptionElement", (currentValue, selectedValue) => {
  console.log(currentValue + " " + selectedValue);
  // initialize selected property
  var selectedProperty = "";
  // if values are equal set selectedProperty accordingly
  if (currentValue == selectedValue.toString()) {
    selectedProperty = "selected";
  }
  // return html code for this option element
  return new hbs.SafeString(
    `<option ${selectedProperty}>${currentValue}</option>`
  );
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
