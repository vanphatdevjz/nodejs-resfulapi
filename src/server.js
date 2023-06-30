require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const fileUpload = require("express-fileupload");

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const app = express(); // app express
const connection = require("./config/database");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// config fileupload
app.use(fileUpload());

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
//config template engine
configViewEngine(app);

// khai báo route
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);

//test connection
(async () => {
  try {
    //using mongoose
     await connection();

    //using mongodb driver
    // Connection URL
    const url = process.env.DB_HOST_WITH_DRIVER;
    const client = new MongoClient(url);

    //database Name
    const dbName = process.env.DB_NAME;

    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('documents');
    // collection.insertOne({ 'name': "Hoi Dan IT" });
    




    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>Error connect to DB: ", error);
  }
})();
