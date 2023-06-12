import express from "express";
import visitorController from "../Controller/visitorController.js";
const visitorRouter = express.Router();

visitorRouter.get("/", visitorController.getVisitors);
visitorRouter.get("/:dateVisited", visitorController.getVisitorsByDate);
visitorRouter.get("/:purposeOfEntry", visitorController.getVisitorsByPurpose);
visitorRouter.post("/", visitorController.createVisitor);

export default visitorRouter;
