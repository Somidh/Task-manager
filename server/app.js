const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks");
require("dotenv").config();
const cors = require("cors");
const errorHandleMiddleware = require("./middleware/error-handler");

const port = 3000;
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(errorHandleMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
app.use("/api/v1/tasks", tasks);
