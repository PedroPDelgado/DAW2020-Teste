const { json } = require('express');
var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next) {
  res.send("Hello")
});

module.exports = router;
