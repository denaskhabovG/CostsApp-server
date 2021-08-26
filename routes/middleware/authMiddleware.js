const jwt = require('jsonwebtoken');
const { secretAccessToken } = require('../../config/jwtConfig');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(req.headers.authorization);

        if (!token) {
            res.status(400).json({ message: 'User is not logged in' });
        }

        req.user = jwt.verify(token, secretAccessToken);

        next();
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'User is not logged in' });
    }
}
