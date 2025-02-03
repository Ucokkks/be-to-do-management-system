var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
// const { stringify } = require('jade/lib/utils');

//Gett All Users
router.get('/', async function (req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('error get user by id');
  }
});

//Get User By ID
router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('error get user by id');
  }
});

// Create User
router.post('/create', async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const stringPassword = JSON.stringify(hashPassword);
    const users = await prisma.user.create({
      data: {
        username: name,
        email,
        password: stringPassword,
      },
    });
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('error membuat user');
  }
});

// Update User
router.put('/update/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const stringPassword = JSON.stringify(hashPassword);
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        username: name,
        email,
        password: stringPassword,
      },
    });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('error update user');
  }
});

// Delete User
router.delete('/delete/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('error delete user');
  }
});

module.exports = router;
