const userModel = require('../models/User')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../config/nodemailer');

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = await userModel.findById(req.params.id);
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userId);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const createUser = async (req, res) => {
    const newUser = new userModel(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const deleteUser = async (req, res) => {

    try {

        const deletedUser = await userModel.deleteOne({
            _id: req.body.id
        });

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

const register = async (req, res) => {

    try {
        const existingUser = await userModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                status: false,
                message: 'Email already registered'
            });
        }

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                status: false,
                message: 'Name, email and password are required'
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = new userModel({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address || '',
            password: hashedPassword,
            role: req.body.role || 'user'
        });

        const result = await data.save();

        const token = jwt.sign({
            userdata: {
                _id: result._id,
                name: result.name,
                email: result.email,
                role: result.role
            }
        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        await sendWelcomeEmail({
            userEmail: result.email,
            userName: result.name,
        });

        res.status(201).json({
            success: true,
            status: true,
            message: 'Successfully registered',
            token  // token for auto login
        });

    } catch (error) {

        console.error('Registration error:', error);

        res.status(500).json({
            success: false,
            status: false,
            message: error.message || 'Registration failed'
        });

    }

};

const login = async (req, res) => {
    await userModel.findOne({
        email: req.body.email
    })
        .then((result) => {
            if (result) {
                var compare = bcrypt.compareSync(req.body.password, result.password)
                if (compare) {
                    var token = jwt.sign({
                        userdata: {
                            _id: result._id,
                            name: result.name,
                            email: result.email,
                            role: result.role
                        }
                    },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    )

                    var resp = {
                        status: true,
                        message: 'successfully login',
                        token: token
                    }
                }
                else {
                    var resp = {
                        status: false,
                        message: 'incorrect password',
                    }
                }
            }
            else {
                var resp = {
                    status: false,
                    message: 'incorrect email and password'
                }
            }
            res.send(resp);
        })
        .catch((error) => {
            var error = {
                status: false,
                message: 'something went wrong',
                data: error.message
            }
            res.send(error);
        })
};

const profile = async (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).json({
            success: false,
            token_error: true,
            message: 'Token required'
        });
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            token_error: true,
            message: 'Invalid token'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (error, result) {

        if (error) {

            return res.status(401).json({
                success: false,
                message: 'Incorrect token',
                token_error: true
            });

        }

        res.status(200).json({
            success: true,
            message: 'Profile found',
            data: result
        });

    });

};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    register,
    login,
    profile
};