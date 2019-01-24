const express = require('express');
const router = express.Router();
const fs = require('fs');

//this text variable reads the dictionary file and splits the text into something more readable
const text = fs.readFileSync('dictionary.txt','utf8').split(/[\n\r]/)

/* GET words listing. */
router.get('/', function(req, res, next) {
  res.json(text)
});

module.exports = router;


