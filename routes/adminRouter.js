import express from "express";
import adminController from "../Controller/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/", adminController.createAdmin);

export default adminRouter;
