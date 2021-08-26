const jwt = require('jsonwebtoken');
const { secretAccessToken, secretRefreshToken } = require('../config/jwtConfig');

module.exports = tokensService = (id, roles) => {
    const generateAccessToken = () => {
        const payload = {
            id,
            roles
        }

        return jwt.sign(payload, secretAccessToken, { expiresIn: '1m' });
    }

    const generateRefreshToken = () => {
        const payload = {
            id,
        }

        return jwt.sign(payload, secretRefreshToken, { expiresIn: '2m' });
    }

    return {
        generateAccessToken,
        generateRefreshToken
    };
}
