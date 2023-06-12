import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
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
    // dateVisited: {
    //   type: Date,
    //   default: Date.now,
    // }, //real time
    // timeVisited: {
    //   type: String,
    //   default: Date.now,
    // },
    // timeExited: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

visitorSchema.set("toJSON", {
  transform: function (document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;

    // Format the dateVisited field to display only the date
    if (returnedObject.dateVisited) {
      returnedObject.dateVisited = returnedObject.dateVisited
        .toISOString()
        .split("T")[0];
    }
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
