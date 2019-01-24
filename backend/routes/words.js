var express = require('express');
var router = express.Router();
const fs = require('fs');

let text = fs.readFileSync('dictionary.txt','utf8').split(/[\n\r]/)

/* GET words listing. */
router.get('/', function(req, res, next) {
  res.json(text)
});

module.exports = router;


