
// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASSWORD,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

require("dotenv").config();
const mongoose = require("mongoose");
const dbState = [{
  value: 0,
  label: "Disconnected"
},
{
  value: 1,
  label: "Connected"
},
{
  value: 2,
  label: "Connecting"
},
{
  value: 3,
  label: "Disconnecting"
}];


const connection = async() => {
  // Or:
  const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
  }
  await mongoose.connect(await process.env.DB_HOST, options);
  const state = Number(mongoose.connection.readyState);
  console.log(dbState.find(f => f.value === state).label, "to database"); // connected to db

}
module.exports = connection;