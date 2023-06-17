const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectionDB = require("./db/connect"); // required to connect to the database
require("dotenv").config();
const notFound = require("./middlewares/not-found");
// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(notFound);
// app.get("/hello", (req, res) => {
//   res.status(200).send(`task manager ke chutiape`);
// });
// middleware for routing purposes as the route "/api/v1/tasks" will be given as default route for all in 'tasks
app.use("/api/v1/tasks", tasks);

const PORT = 5000;
const start = async () => {
  // this function is returing a promise function due to the connectionDB function and we want that first the database connection is made and then onlly the server should be connected otherwise error should be thrown
  try {
    await connectionDB(process.env.MONGO_URI); // this await function on this promise function connectionDB is used so that this function is executed first and then the connection to the server happens
    app.listen(
      PORT,
      console.log(
        `Database started and henceforth server is listening on ${PORT}`
      )
    );
  } catch (err) {
    console.log(
      `dabatase connection error: '${err}' hence no use of connecting to the server`
    );
  }
};
start();
