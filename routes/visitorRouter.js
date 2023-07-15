/* eslint-disable linebreak-style */
import express from "express";
import personController from "../controllers/visitorController.js";
import visitorController from "../controllers/visitorController.js";

const visitorRouter = express.Router();

visitorRouter.get("/", visitorController.getVisitors);
visitorRouter.get("/:id", visitorController.getVisitor);
visitorRouter.get(
  "/firstName/:firstName",
  visitorController.getVisitorByFirstName
);
visitorRouter.get(
  "/lastName/:lastName",
  visitorController.getVisitorByLastName
);

visitorRouter.get("/date/:dateVisited", visitorController.getVisitorsByDate);
visitorRouter.get(
  "/purpose/:purposeOfEntry",
  visitorController.getVisitorsByPurpose
);
visitorRouter.post("/", visitorController.createVisitor);

visitorRouter.put("/exit/:id", visitorController.updateVisitor);

export default visitorRouter;
