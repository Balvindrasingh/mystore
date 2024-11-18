// Import the Express framework to handle routes
const express = require("express");

// Create a router object to define routes related to 'items'
const router = express.Router();

// Import the Course model to interact with the 'Items' collection in MongoDB
const Course = require("../models/Items");

// Import the authentication middleware to secure routes
const AuthenticationMiddleware = require("../extensions/authentication");

// GET /items/
// Route to retrieve and display all items
router.get("/", AuthenticationMiddleware, async (req, res, next) => {
  try {
    // Retrieve all items from the database, sorted by name in ascending order
    let courses = await Course.find().sort([["name", "ascending"]]);
    // Render the "Items/index" view with the retrieved data and user information
    res.render("Items/index", { 
      title: "Item List", 
      dataset: courses, 
      user: req.user 
    });
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
});

// GET /items/add
// Route to render the form for adding a new item
router.get("/add", AuthenticationMiddleware, (req, res, next) => {
  // Render the "Items/add" view with a title and user information
  res.render("Items/add", { 
    title: "Add a New Item", 
    user: req.user 
  });
});

// POST /items/add
// Route to handle the submission of the form for adding a new item
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  try {
    // Create a new item using data from the request body
    let newCourse = new Course({
      name: req.body.name, // The name of the item
      code: req.body.code, // The code of the item
    });
    // Save the new item to the database
    await newCourse.save();
    // Redirect the user to the list of items
    res.redirect("/Items");
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
});

// Export the router object to make it accessible in other parts of the app
module.exports = router;
