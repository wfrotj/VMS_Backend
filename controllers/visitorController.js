/* eslint-disable linebreak-style */
import User from "../models/User.js";
import Visitor from "../models/Visitor.js";
import isString from "../utils/isString.js";
import getTokenFrom from "../utils/getTokenFrom.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

async function getVisitors(req, res) {
  const visitors = await Visitor.find({});
  return res.json(visitors);
}

async function getVisitor(req, res, next) {
  try {
    const { id } = req.params;
    const visitor = await Visitor.findById(id);

    if (visitor) return res.json(visitor);

    return res.status(404).json({ error: "Visitor not found" });
  } catch (error) {
    next(error);
  }
}
async function getVisitorByFirstName(req, res, next) {
  try {
    const { firstName } = req.params;
    const visitor = await Visitor.find({ firstName });

    if (visitor) return res.json(visitor);

    return res.status(404).json({ error: "Visitor not found" });
  } catch (error) {
    next(error);
  }
}
async function getVisitorByLastName(req, res, next) {
  try {
    const { lastName } = req.params;
    const visitor = await Visitor.find({ lastName });

    if (visitor) return res.json(visitor);

    return res.status(404).json({ error: "Visitor not found" });
  } catch (error) {
    next(error);
  }
}
async function createVisitor(req, res, next) {
  try {
    //1. get the needed data
    const { firstName, lastName, contactNumber, purposeOfEntry } = req.body;
    //2. we decode the token
    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);
    //3. we check if the token is valid
    const user = await User.findById(decodedToken.id);
    //4. we convert the date
    const currentDate = new Date();
    const dateVisited = currentDate.toISOString().split("T")[0];
    const timeVisited = currentDate.toLocaleTimeString();
    //5. we create person object
    const visitor = new Visitor({
      firstName,
      lastName,
      contactNumber,
      purposeOfEntry,
      dateVisited,
      timeVisited,
      user: user._id,
    });
    //6. we handle missing data
    if (!firstName || !lastName || !contactNumber || !purposeOfEntry) {
      return res.status(400).json({ error: "Content is missing" });
    }

    const visitorExists = await Visitor.findOne({ firstName, lastName });
    if (visitorExists) {
      return res.status(400).json({ error: "Visitor already exists" });
    }

    const savedVisitor = await visitor.save();

    user.visitors = user.visitors.concat(savedVisitor);
    await user.save();

    return res.status(201).json(savedVisitor);
  } catch (error) {
    next(error);
  }
}

async function getVisitorsByDate(req, res, next) {
  try {
    const { dateVisited } = req.params;
    const date = new Date(dateVisited);
    const convertedDate = date.toISOString().split("T")[0];

    const visitors = await Visitor.find({ dateVisited: convertedDate });
    res.status(200).json(visitors);
  } catch (error) {
    next(error);
  }
}

async function getVisitorsByPurpose(req, res, next) {
  try {
    const { purposeOfEntry } = req.params;

    const visitors = await Visitor.find({
      purposeOfEntry: { $eq: purposeOfEntry },
    });

    res.status(200).json(visitors);
  } catch (error) {
    next(error);
  }
}
const updateVisitor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const visitor = await Visitor.findByIdAndUpdate(id, req.body);
    if (!visitor) {
      return res
        .status(400)
        .json({ message: `cannot find visitor with id ${id}` });
    }
    if (visitor.timeExited) {
      return res.status(400).json({
        message: `This visitor have already exited at ${visitor.timeExited} and cannot be updated`,
      });
    }
    const updatedVisitor = await Visitor.findById(id);
    res.status(200).json(updatedVisitor);
  } catch (error) {
    next(error);
  }
};
//
export default {
  getVisitor,
  getVisitorByFirstName,
  getVisitorByLastName,
  getVisitors,
  getVisitorsByDate,
  getVisitorsByPurpose,
  createVisitor,
  updateVisitor,
};
