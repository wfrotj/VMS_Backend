import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

async function createAdmin(req, res) {
  const { username, name, employeeNumber, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const admin = new Admin({
    username,
    name,
    employeeNumber,
    passwordHash,
  });

  const savedAdmin = await admin.save();

  return res.status(201).json(savedAdmin);
}

export default {
  createAdmin,
};
