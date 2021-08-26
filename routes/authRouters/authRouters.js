const authRouter = require('express').Router();
const controllers = require('../conroller/authController/authController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleWare');

authRouter.post('/registration', [
    body('username', 'Username cannot be empty').notEmpty(),
    body('password', 'password must be more than 4 characters and less than 10').isLength({ min: 4, max: 10 }),
], controllers.registration);
authRouter.post('/login', controllers.login);
authRouter.get('/users', roleMiddleware(['ADMIN']), controllers.getUsers);
authRouter.post('/refresh', controllers.refreshToken);

module.exports = authRouter;
