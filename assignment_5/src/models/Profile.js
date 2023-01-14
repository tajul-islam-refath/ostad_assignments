const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String },
    createdDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const ProfileModel = mongoose.model("profiles", DataSchema);
module.exports = UsersModel;
