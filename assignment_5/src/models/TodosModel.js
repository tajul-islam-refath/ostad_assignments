const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userName: { type: String },
    subject: { type: String },
    description: { type: String },
    status: { type: String, default: "New" },
    createdDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const TodosModel = mongoose.model("todos", DataSchema);
module.exports = TodosModel;
