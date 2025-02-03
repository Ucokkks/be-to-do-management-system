var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Gett All Task
router.get('/', async function (req, res) {
  try {
    const task = await prisma.task.findMany();
    return res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send('error get all task');
  }
});

//Get Task By ID
router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send('error get task by id');
  }
});

//Create Task
router.post('/create', async function (req, res) {
  try {
    const { task, desc, priority, deadline } = req.body;
    const tasks = await prisma.task.create({
      data: {
        task: task,
        desc: desc,
        priority: priority,
        deadline: deadline,
      },
    });
    return res.send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send('error create task');
  }
});

// Update User
router.put('/update/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const { task, desc, priority, deadline } = req.body;
    const tasks = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        task: task,
        desc: desc,
        priority: priority,
        deadline: deadline,
      },
    });
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('error update task');
  }
});

// Delete Task

router.delete('/delete/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const task = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send('error delete task');
  }
});

module.exports = router;
