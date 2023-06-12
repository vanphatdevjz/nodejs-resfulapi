require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const app = express();
const connection = require('./config/database');
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data
//config template engine
configViewEngine(app);

// khai báo route
app.use("/", webRoutes);



// simple query
// connection.query(
//   'SELECT * FROM Users u ',
//   function(err, results, fields) {
//     console.log('>>>results=',results); // results contains rows returned by server
//     // console.log('>>>fields:',fields); // fields contains extra meta data about results, if available
//   }
// );


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
