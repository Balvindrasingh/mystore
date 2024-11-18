// Naming convention for controllers/routers: use plural form for entities
// Import express and create a router object to handle routes for this controller
const express = require("express");
const router = express.Router();

// Import mongoose models for projects and courses
const Project = require("../models/project");
const Course = require("../models/Items");

// Import the authentication middleware for verifying user sessions
const AuthenticationMiddleware = require("../extensions/authentication");

// Configure GET/POST handlers for routes

// GET /projects/
// Route to retrieve and display all projects, sorted by dueDate in descending order
router.get("/", AuthenticationMiddleware, async (req, res, next) => {
  try {
    // Retrieve all projects from the database, sorted by dueDate (descending order)
    let projects = await Project.find().sort([["dueDate", "descending"]]);
    
    // Render the view with the list of projects and user details
    res.render("projects/index", {
      title: "Selling Tracker",  // Title of the page
      dataset: projects,        // The data (projects) to be displayed in the view
      user: req.user,           // The user details from the request object
    });
  } catch (err) {
    next(err); // If there's an error, pass it to the next middleware (error handler)
  }
});

// GET /projects/add
// Route to render the page for adding a new project
router.get("/add", AuthenticationMiddleware, async (req, res, next) => {
  try {
    // Retrieve the list of courses, sorted by name in ascending order
    let courseList = await Course.find().sort([["name", "ascending"]]);
    
    // Render the add project form with available courses and user details
    res.render("projects/add", {
      title: "Add a New Item",  // Title of the page
      courses: courseList,      // List of courses to be used for the new project
      user: req.user,           // User details for session-based access control
    });
  } catch (err) {
    next(err); // If there's an error, pass it to the next middleware (error handler)
  }
});

// POST /projects/add
// Route to handle the submission of a new project
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  try {
    // Create a new Project using the data from the request body
    let newProject = new Project({
      name: req.body.name,       // Project name
      dueDate: req.body.dueDate, // Project due date
      course: req.body.course,   // Associated course
    });
    
    // Save the new project to the database
    await newProject.save();
    
    // Redirect the user to the projects list after successful creation
    res.redirect("/projects");
  } catch (err) {
    next(err); // If there's an error, pass it to the next middleware (error handler)
  }
});

// GET /projects/delete/:_id
// Route to delete a project by its ID
router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
  try {
    let projectId = req.params._id; // Retrieve the project ID from the URL parameters
    
    // Remove the project from the database using the provided ID
    await Project.findByIdAndRemove({ _id: projectId });
    
    // Redirect to the projects list after deletion
    res.redirect("/projects");
  } catch (err) {
    next(err); // If there's an error, pass it to the next middleware (error handler)
  }
});

// GET /projects/edit/:_id
// Route to render the form for editing an existing project
router.get("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  try {
    let projectId = req.params._id; // Retrieve the project ID from the URL parameters
    
    // Retrieve the project data to pre-fill the form
    let projectData = await Project.findById(projectId);
    
    // Retrieve the list of courses for the select dropdown in the edit form
    let courseList = await Course.find().sort([["name", "ascending"]]);
    
    // Render the edit form with the current project data and available courses
    res.render("projects/edit", {
      title: "Edit Project Info", // Title of the page
      project: projectData,      // Existing project data to populate the form
      courses: courseList,       // List of courses for selection
      user: req.user,            // User details
    });
  } catch (err) {
    next(err); // If there's an error, pass it to the next middleware (error handler)
  }
});

// POST /projects/edit/:_id
// Route to handle the submission of project edits
router.post("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  try {
    let projectId = req.params._id; // Retrieve the project ID from the URL parameters
    
    // Update the project in the database with the new data from the request body
    await Project.findByIdAndUpdate(
      { _id: projectId }, // Filter to find the project to update
      {
        name: req.body.name,       // Updated project name
        dueDate: req.body.dueDate, // Updated project due date
        course: req.body.course,   // Updated course
        status: req.body.status,   // Updated project status (e.g., For Sale, Sold, Unavailable)
      }
    );
    
    // Redirect to the projects list after the update
    res.redirect("/projects");
  } catch (err) {
    next(err); // If there's an error, pass it to the next middleware (error handler)
  }
});

// Export the router object to be used in other parts of the app
module.exports = router;
