var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Simple Login' });
});

router.get('/signUpPage', (req, res, next) => {
  res.render('signUpPage');
})

module.exports = router;
