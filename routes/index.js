var express = require('express');
var router = express.Router();

//Greeting API

router.get('/', function (req, res) {
  try {
    res.send('Selamat Datang\nDi Restful API Pemrogramana Web Guru Tamu');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
