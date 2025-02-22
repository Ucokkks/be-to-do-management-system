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
    const { title, desc, priority, deadline, created_by } = req.body;
    const tasks = await prisma.task.create({
      data: {
        title: title,
        desc: desc,
        priority: priority,
        deadline: deadline,
        created_by: created_by,
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
    const { title, desc, priority, deadline, created_by } = req.body;
    const tasks = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        desc: desc,
        priority: priority,
        deadline: deadline,
        created_by: created_by,
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
