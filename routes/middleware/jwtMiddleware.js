const jwt = require('jsonwebtoken');
const { secretAccessToken } = require('../../config/jwtConfig');

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.status(403).json({ message: 'Invalid token' });
        }

        req.headers.authorization = jwt.verify(token, secretAccessToken);

        next();
    } catch (e) {
        console.log(e);
        res.status(403).json({ message: e });
    }
}
