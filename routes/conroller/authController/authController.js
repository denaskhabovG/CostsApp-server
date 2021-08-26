const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const tokensService = require('../../tokens-service');
const jwt = require("jsonwebtoken");
const {secretRefreshToken} = require("../../../config/jwtConfig");
const {secretAccessToken} = require("../../../config/jwtConfig");

class AuthController {
    async registration(req, res) {
        try {
            console.log(req.body)
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors });
            }

            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (candidate) {
                return res.status(400).json({ message: 'This user already exists' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'ADMIN' });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();

            return res.json({ message: 'User registered successfully' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' } );
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: `Неправильный пароль` });
            }

            const tokenGenerator = tokensService(user._id, user.roles);

            const accessToken = tokenGenerator.generateAccessToken();
            const refreshToken = tokenGenerator.generateRefreshToken();
            return res.json({ accessToken, refreshToken });

        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' } )
        }
    }

    async refreshToken(req, res)  {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const payload = jwt.verify(token, secretRefreshToken);

            const user = await User.findOne({ _id: payload.id });

            if (!user) {
                return res.status(404).json({ message: `User was not found` });
            }

            const tokenGenerator = tokensService(user._id, user.roles);

            const accessToken = tokenGenerator.generateAccessToken();
            const refreshToken = tokenGenerator.generateRefreshToken();
            return res.json({ accessToken, refreshToken });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Refresh error:', e } )
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
            res.json('server work');
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController();
