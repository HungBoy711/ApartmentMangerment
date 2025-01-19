const jwt = require('jsonwebtoken');
const CitizenAccount = require('../models/citizenAccount')

const verifyCitizenToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(403).redirect('/loginCitizen')
            } else {
                const citizenAccount = await CitizenAccount.findById(decodedToken.citizenAccountId);
                res.locals.citizenAccount = citizenAccount;

                next();
            }
        })
    } else {
        res.status(401).redirect('/login')
    }
}

module.exports = verifyCitizenToken;