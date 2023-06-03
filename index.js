import app from "./app.js";
import config from "./utils/config.js";

app.listen(config.PORT, () => {
  console.log(`We are now live at port ${config.PORT}`);
});
