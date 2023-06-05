import mongoose from "mongoose";
import app from "./app.js";
import config from "./utils/config.js";

async function connectToDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database");
  } catch (error) {
    console.log(`Error occured connecting to the database ${error}`);
  }
}

connectToDB(config.MONGODB_URI);


app.get("/", (req, res) => {
  res.send("Visiting Management System");
});
app.listen(config.PORT, () => {
  console.log(`We are now live at port ${config.PORT}`);
});
