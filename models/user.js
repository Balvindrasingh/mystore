// Import mongoose to work with MongoDB
const mongoose = require('mongoose');

// Import passport-local-mongoose (plm) to extend user authentication functionality
const plm = require('passport-local-mongoose');

// Define the schema object representing the structure of user data in MongoDB
var dataSchemaObj = {
    username: { type: String }, // Field: username, type String
    password: { type: String }, // Field: password, type String
    // Fields for handling OAuth-authenticated users
    oauthId: { type: String }, // OAuth ID: identifies the user in a third-party system
    oauthProvider: { type: String }, // OAuth provider: e.g., GitHub, Google
    created: { type: Date }, // Field: created, type Date, tracks when the user was created
};

// Create a Mongoose schema using the defined schema object
var userSchema = new mongoose.Schema(dataSchemaObj);

// Extend the user schema with passport-local-mongoose functionalities
// This plugin adds features like hashing/salting passwords and handling authentication
userSchema.plugin(plm);

// Export the enhanced model as 'User', linking it to the 'users' collection in MongoDB
module.exports = new mongoose.model('User', userSchema);
