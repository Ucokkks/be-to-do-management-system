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
    return res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send('error get user by id');
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
    return res.status(500).send('error get user by id');
  }
});

// Create User
router.post('/create', async function (req, res) {
  const { name , email , password } = req.body;
  name === ''
    ? res.json('Please the name field')
    : email === ''
      ? res.json('Please the email field')
      : password === ''
        ? res.json('Please the password field')
        : (async () => {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
              data: {
                username: name,
                email,
                password: hashPassword,
              },
            });
            res.send(user);
          })();
});

// Update User
router.put('/update/:id', async function (req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  name === ''
    ? res.json('Please fill the name field')
    : email === ''
      ? res.json('Please fill the email field')
      : password === ''
        ? res.json('Please fill the password field')
        : (async () => {
            const user = await prisma.user.update({
              where: {
                id: parseInt(id),
              },
              data: {
                username: name,
                email,
                password: hashPassword,
              },
            });
            res.send(user);
          })();
});

// Delete User
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const userExist = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  userExist === null
    ? res.json(`Data user dengan id ${id} tidak ada atau kosong`)
    : (async () => {
        const user = await prisma.user.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.status(200).send(user);
      })();
});

module.exports = router;
