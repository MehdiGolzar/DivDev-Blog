const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

const bloggerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "first name minimum length is 3 chars"],
    maxlength: [50, "first name maximum length is 50 chars"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "first name minimum length is 3 chars"],
    maxlength: [50, "first name maximum length is 50 chars"],
  },
  username: {
    type: String,
    required: true,
    trim: true, //because the client can't use space for username firstName and lastName
    minLength: [3, "username must be at more 4 characters"],
    maxLength: [30, "username must be at less 30 characters"],
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: (email) => {
      validator.isEmail(email);
    },
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: (number) => {
      validator.isMobilePhone(number, "fa-IR");
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: [8, "password must be at least 8 characters"],
    maxLength: [14, "password cannot be more than 14 characters"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  role: {
    type: String,
    enum: ['blogger', 'admin'],
    default: 'blogger'
  }
});

// Hash Password
bloggerSchema.pre('save', function (next) {
  let user = this._doc;
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  } else {
    next()
  }

});

bloggerSchema.post('save', function (doc, next) {
  next()
});


module.exports = mongoose.model("User", bloggerSchema);