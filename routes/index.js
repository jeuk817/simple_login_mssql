var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

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

// 로그인
router.post('/signIn', async (req, res, next) => {
  const { id, pwd } = req.body;
  try {
    const pool = await connPoolPromise;
    const result = await pool.request()
      .input('inputID', id)
      .query('select * from Users where ID = @inputID');

    if (!result.recordset.length) return res.send('없음');
    if (result.recordset[0].PASSWD !== pwd) return res.send('틀림');

    const token = jwt.sign({
      id: result.recordset[0].ID,
      pwd: result.recordset[0].PASSWD
    }, process.env.JWT_SECRET, {
      expiresIn: '30m',
      issuer: 'jack'
    });
    res.cookie('jwt_token', token, {
      httpOnly: true,
      maxAge: 30 * 60000,
    });

    return res.redirect('/userPage');
  } catch {
    return next(err);
  }
});

router.get('/userPage', (req, res, next) => {
  res.render('userPage');
})

module.exports = router;