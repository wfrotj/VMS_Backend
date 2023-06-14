import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    minlength: 4,
    required: true,
  },
  visitors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
    },
  ],
});
adminSchema.plugin(uniqueValidator);

adminSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
