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

// const createVisitor = async (req, res, next) => {
//   try {
//     const { firstName, lastName, contactNumber, purposeOfEntry, timeExited } =
//       req.body;

//     if (
//       firstName === undefined ||
//       lastName === undefined ||
//       contactNumber === undefined ||
//       purposeOfEntry === undefined ||
//       timeExited === undefined
//     ) {
//       return res.status(400).json({ error: "Content is missing" });
//     }

//     const visitorExists = await Visitor.findOne({ firstName, lastName });

//     if (visitorExists) {
//       return res.status(400).json({ error: "Visitor already exists" });
//     }

//     const dateVisited = new Date(); // Set dateVisited to the current date

//     const visitor = new Visitor({
//       firstName,
//       lastName,
//       contactNumber,
//       purposeOfEntry,
//       dateVisited,
//       timeExited,
//     });

//     const savedVisitor = await visitor.save();

//     return res.status(201).json(savedVisitor);
//   } catch (error) {
//     next(error);
//   }
// };

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

const createVisitor = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      purposeOfEntry,
      timeExited,
      timeVisited,
    } = req.body;

    if (
      firstName === undefined ||
      lastName === undefined ||
      contactNumber === undefined ||
      purposeOfEntry === undefined
    ) {
      return res.status(400).json({ error: "Content is missing" });
    }

    const visitorExists = await Visitor.findOne({ firstName, lastName });

    if (visitorExists) {
      return res.status(400).json({ error: "Visitor already exists" });
    }

    // const dateVisited = new Date(); // Set dateVisited to the current date

    const visitor = new Visitor({
      firstName,
      lastName,
      contactNumber,
      purposeOfEntry,
      timeVisited,
      timeExited,
    });

    const savedVisitor = await visitor.save();

    return res.status(201).json(savedVisitor);
  } catch (error) {
    next(error);
  }
};

const getVisitorsByPurpose = async (req, res) => {
  try {
    const purpose = req.params.purposeOfEntry;

    const visitors = await Visitor.find({});

    res.status(201).json(visitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getVisitors,
  createVisitor,
  getVisitorsByDate,
  getVisitorsByPurpose,
};
