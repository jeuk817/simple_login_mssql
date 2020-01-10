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

// 회원가입
router.post('/signUp', async (req, res, next) => {
  const { id, pwd } = req.body;
  try {
    const pool = await connPoolPromise;
    const result = await pool.request()
      .input('inputID', id)
      .query('select * from Users where ID = @inputID');
    if (result.recordset.length) return res.send('중복');

    await pool.request()
      .input('inputID', id)
      .input('inputPwd', pwd)
      .query('insert into Users values(@inputID, @inputPwd)');
    return res.send('가입');
  } catch (err) {
    return next(err);
  }
})

module.exports = router;