// Import required functions from 'crypto' module for hashing and generating random bytes
const { randomBytes, createHmac } = require("crypto");
// Import Schema and model functions from 'mongoose' for defining and creating MongoDB models
const { Schema, model } = require("mongoose");

// Define a Mongoose schema for the 'User' model
const userSchema = new Schema(
  {
    // 'fullName' field must be a String and is required
    fullName: {
      type: String,
      required: true,
    },
    // 'email' field must be a String, required, and must be unique across users
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // 'salt' field is used to store the unique salt string for password hashing
    salt: {
      type: String,
      required: true,
    },
    // 'password' field stores the hashed password, must be unique and required
    password: {
      type: String,
      required: true,
      unique: true,
    },
    // 'profileImageURL' stores the URL of user's profile image with a default value if not provided
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    // 'role' indicates if the user is an 'ADMIN' or 'USER' with default as 'USER'
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    // Enables automatic tracking of 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
  }
);

// A pre-save hook to hash the password before saving the user document
userSchema.pre("save", function (next) {
  // 'this' refers to the current user document
  const user = this;

  // If the password field is not modified, skip hashing
  if (!user.isModified("password")) return;

  // Generate a random salt of 16 bytes and convert it to a string
  const salt = randomBytes(16).toString();

  // Create a hashed password using HMAC with SHA256 algorithm and the generated salt
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password) // Update HMAC with the user's plain password
    .digest("hex"); // Output the hash as a hexadecimal string

  // Store the generated salt in the user document
  this.salt = salt;
  // Store the hashed password in the user document
  this.password = hashedPassword;

  // Proceed to the next middleware or save operation
  next();
});

// Create the User model from the defined schema
const User = model("user", userSchema);

// Export the User model for use in other files
module.exports = User;
