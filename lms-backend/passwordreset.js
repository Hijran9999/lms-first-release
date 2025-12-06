const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const resetPassword = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hash = await bcrypt.hash("newPassword123", 10);

  await User.updateOne(
    { email: "admin@lms.com" },
    { $set: { password: hash } }
  );

  console.log("Password reset successfully!");
  mongoose.disconnect();
};

resetPassword();
