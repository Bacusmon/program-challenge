const express = require('express')
const router = express.Router()
const { Task } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
    const listOfTask = await Task.findAll();
    res.json(listOfTask);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    res.json(task);
})

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfTask = await Task.findAll({ where: {UserId: id}});
    res.json(listOfTask);
})

router.post("/", validateToken, async (req, res) => {
    const task = req.body;
    task.username = req.user.username;
    task.UserId = req.user.id;
    await Task.create(task);
    res.json(task);
});

router.delete("/:taskId", validateToken, async (req, res) => {
  const taskId = req.params.taskId;
  await Task.destroy({
    where: {
      id: taskId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

module.exports = router