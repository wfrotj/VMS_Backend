import Visitor from "../models/Visitor.js";

const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({});
    res.status(200).json(visitors);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const createVisitor = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      purposeOfEntry,

      timeExited,
    } = req.body;

    if (
      firstName === undefined ||
      lastName === undefined ||
      contactNumber === undefined ||
      purposeOfEntry === undefined ||
      timeExited === undefined
    )
      return res.status(400).json({ error: "Content is missing" });

    const visitorExists = await Visitor.findOne({ firstName, lastName });

    if (visitorExists)
      return res.status(400).json({ error: "Visitor already exists" });

    const visitor = new Visitor({
      firstName,
      lastName,
      contactNumber,
      purposeOfEntry,
      timeExited,
    });

    const savedVisitor = await visitor.save();

    return res.status(201).json(savedVisitor);
  } catch (error) {
    next(error);
  }
};

const getVisitorsByDate = async (req, res) => {
  try {
    const { dateVisited } = req.params;

    // Parse the date string from the URL parameter
    const date = new Date(dateVisited);

    // Get the start and end of the specified date
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const end = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const visitors = await Visitor.find({
      dateVisited: { $gte: start, $lt: end },
    });

    res.status(200).json(visitors);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
const getVisitorsByPurpose = async (req, res) => {
  try {
    const { purpose } = req.query;

    // Check if the purpose is valid
    const validPurposes = [
      "enrollment",
      "meeting",
      "inquiry",
      "payments",
      "seminar",
    ];
    if (!validPurposes.includes(purpose)) {
      return res.status(400).json({ message: "Invalid purpose of entry" });
    }

    // Perform the database query to find visitors by purpose
    const visitors = await Visitor.find({ purposeOfEntry: purpose });

    // Return the visitors as the response
    res.json(visitors);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  getVisitors,
  createVisitor,
  getVisitorsByDate,
  getVisitorsByPurpose,
};
