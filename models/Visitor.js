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
    visitorIdNumber: {
      type: String,
      required: true,
    },
    returnedId: {
      type: Boolean,
      default: false,
    },
    dateVisited: {
      type: Date,
      default: Date.now,
    },
    timeVisited: {
      type: String,
      default: function () {
        return new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: { createdAt: false },
  }
);

visitorSchema.set("toJSON", {
  transform: function (document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    returnedObject.dateVisited = returnedObject.dateVisited
      .toISOString()
      .split("T")[0];
    returnedObject.updatedAt = new Date(
      returnedObject.updatedAt
    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  },
});
const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
