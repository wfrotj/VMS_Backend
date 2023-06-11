import mongoose from "mongoose";
import moment from "moment";

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
    enum: ["enrollment", "meeting", "inquiry", "payments", "seminar"],
    required: true,
  },
  timeVisited: {
    type: Date,
    default: Date.now,
  },
  dateVisited: {
    type: Date,
    default: Date.now,
  },
  timeExited: {
    type: String,
    required: true,
  },
});

visitorSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;

    // Format dateVisited to date only if it is a valid Date object
    if (
      returnedObject.dateVisited instanceof Date &&
      !isNaN(returnedObject.dateVisited)
    ) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      returnedObject.dateVisited =
        returnedObject.dateVisited.toLocaleDateString(undefined, options);
    }

    // Format timeVisited using Moment.js if it is a valid Date object
    if (
      returnedObject.timeVisited instanceof Date &&
      !isNaN(returnedObject.timeVisited)
    ) {
      returnedObject.timeVisited = moment(returnedObject.timeVisited).format(
        "hh:mm A"
      );
    }

    return returnedObject;
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
