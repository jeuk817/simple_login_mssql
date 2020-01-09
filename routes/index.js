var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Simple Login' });
});

router.get('/signUpPage', (req, res, next) => {
  res.render('signUpPage');
});

router.post('/signUp', (req, res, next) => {
  const { id, pwd } = req.body;
})

module.exports = router;
