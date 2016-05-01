const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowerCase: true },
  password: String
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema); // all users

// Export the model
module.exports = ModelClass;
