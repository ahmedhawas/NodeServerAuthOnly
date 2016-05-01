const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowerCase: true },
  password: String
});

// on save hoook bcrypt password
userSchema.pre('save', function(next) { // before user gets saved
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema); // all users

// Export the model
module.exports = ModelClass;
