import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  purposeOfEntry: {
    type: String,
    enum: ["interview", "meeting", "conference"],
    required: true,
  },

  dateVisited: {
    type: Date,
    default: Date.now,
  },
});
visitorSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
