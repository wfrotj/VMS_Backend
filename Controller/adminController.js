import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

async function getAdmins(req, res) {
  try {
    const admins = await Admin.find({});
    res.status(200).json(admins);
  } catch (error) {
    console.log("error");
    res.status(400).json({ message: error.message });
  }
}

async function createAdmin(req, res) {
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
}

export default {
  createAdmin,
};
