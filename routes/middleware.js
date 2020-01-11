const jwt = require('jsonwebtoken');

exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_token;
        if (!token) return next();

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        return next();
    } catch (err) {
        return next(err);
    }
}