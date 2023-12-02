const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const userRouter = require('./routes/Users');
app.use("/users", userRouter);

const taskRouter = require('./routes/Task');
app.use("/task", taskRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

module.exports = app;