const jwt = require('jsonwebtoken');

exports.isLoggedIn = async (req, res, next) => {
    try {
        console.log('req.cookies : ', req.cookies);
        const token = req.cookies.jwt_token;
        if (!token) return res.redirect('/');

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        return next();
    } catch (err) {
        return next(err);
    }
}