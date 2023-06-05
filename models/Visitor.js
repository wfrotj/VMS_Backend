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
      enum: ["interview", "meeting", "conference"],
      required: true,
    },

    dateVisited: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);
visitorSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;

    // Format timestamps to date only
    if (returnedObject.createdAt instanceof Date) {
      returnedObject.dateVisited =
        returnedObject.createdAt.toLocaleDateString();
    }
    if (returnedObject.updatedAt instanceof Date) {
      returnedObject.updated_at = returnedObject.updatedAt.toLocaleDateString();
    }

    // Delete the original createdAt and updatedAt properties
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;

    return returnedObject;
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
