const jwt = require('jsonwebtoken');
const User = require('../models/user')

const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(403).redirect('/login')
            } else {
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.status(401).redirect('/login')
    }
}

module.exports = verifyToken;