const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    userType: {
        type: String,
        required: [true, "Please add a user type"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    carts: {
        type: Array,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema)