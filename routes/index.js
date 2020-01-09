var express = require('express');
var router = express.Router();

const { connPoolPromise } = require('../db/connect_mssql');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Simple Login' });
});

router.get('/signUpPage', (req, res, next) => {
  res.render('signUpPage');
});

router.post('/signUp', async (req, res, next) => {
  const { id, pwd } = req.body;

  try {
    const pool = await connPoolPromise;
    const result = await pool.request()
      .query('select * from Users');

    console.log(result);
  } catch (err) {
    return next(err);
  }
})

module.exports = router;
