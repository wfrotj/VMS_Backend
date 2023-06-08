import express from "express";
import cors from "cors";
import visitorRouter from "./routes/visitorRouter.js";
import adminRouter from "./routes/adminRouter.js";

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use("/api/admin", adminRouter);
app.use("/api/visitors", visitorRouter);

export default app;
