const jwt = require('jsonwebtoken');
const { secret } = require('../../config/jwtConfig');

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                res.status(403).json({ message: 'User is not logged in' });
            }

            const { roles: userRoles } = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach(role => {
                if (role.includes(roles)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return res.status(400).json({ message: 'You don\'t have access' });
            }
            next();
        } catch (e) {
            console.log(e);
            res.status(403).json({ message: 'User is not logged in' });
        }
    }
}
