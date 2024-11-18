// Naming convention for models: use the singular form of the represented entity
// Import mongoose to interact with MongoDB
const mongoose = require("mongoose");

// Define the schema object that represents the structure of our data in MongoDB
const dataSchemaObj = {
  name: { type: String, required: true }, // Field: name, type String, required
  // dueDate: { type: Date }, // Uncomment if you want to include a dueDate field
  status: { type: String, default: "For Sale" }, // Field: status, type String, with a default value of "For Sale"
};

// Create a mongoose schema using the defined schema object
const projectsSchema = mongoose.Schema(dataSchemaObj);

// Export the mongoose model based on the schema
// The model is named "Project" and maps to the "projects" collection in MongoDB
module.exports = mongoose.model("Project", projectsSchema);
