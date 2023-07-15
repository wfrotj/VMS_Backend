/* eslint-disable linebreak-style */
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

async function getAdmin(_req, res, next) {
  try {
    const admin = await Admin.find({}).populate("users");

    return res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
}

async function createAdmin(req, res, next) {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const admin = new Admin({
      username,
      name,
      passwordHash,
    });

    const savedAdmin = await admin.save();

    return res.status(201).json(savedAdmin);
  } catch (error) {
    next(error);
  }
}

export default {
  createAdmin,
  getAdmin,
};
