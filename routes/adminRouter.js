import express from "express";
import adminController from "../Controller/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/", adminController.createAdmin);
adminRouter.get();

export default adminRouter;
