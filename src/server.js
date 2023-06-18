require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const app = express();
const connection = require("./config/database");
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;


app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
//config template engine
configViewEngine(app);

// khai báo route
app.use("/", webRoutes);


//test connection
(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>Error connect to DB: ", error);
  }
})();
