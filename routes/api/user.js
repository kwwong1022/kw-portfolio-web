const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user.js');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();
require('dotenv').config();

//  create new user
router.post('/user', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`POST "/api/user" api call failed. api key is missing or incorrect`);
        res.status(StatusCodes.FORBIDDEN).json({
            message: 'forbidden',
            success: false,
            data: null
        });

    } else {
        const userExist = await User.findOne({ _id: req.session.user_id });
        const userRole = userExist? userExist.role : "";
        const isAdmin = userRole == "Admin";

        if (userExist && isAdmin) {
            const { username, password, role, email } = req.body;
            const hashedPwd = await bcrypt.hash(password, 12);

            try {
                const user = new User({
                    username,
                    password: hashedPwd,
                    role: role,
                    creationTime: Date.now(),
                    modificationTime: Date.now(),
                    email: email
                })
                await user.save();
                console.log('create user successful, saved user to mongoDB');
                res.status(StatusCodes.OK).json({
                    message: 'create user successful.',
                    success: true,
                    data: user
                });

            } catch (err) {
                console.log(`internal server error. error: ${err}`);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'internal server error',
                    success: false,
                    data: null
                });
            }

        } else {
            console.log(`unauthorized user`);
            res.status(StatusCodes.FORBIDDEN).json({
                message: 'forbidden',
                success: false,
                data: null
            });
        }
    }
});

//  get users
router.get('/users', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`GET "/api/users" api call failed. api key is missing or incorrect`);
        res.status(StatusCodes.FORBIDDEN).json({
            message: 'forbidden',
            success: false,
            data: null
        });

    } else {
        const userExist = await User.findOne({ _id: req.session.user_id });
        const userRole = userExist? userExist.role : "";
        const isAdmin = userRole == "Admin";

        if (userExist && isAdmin) {
            const { limit=250, current=0, sortType='desc' } = req.query;

            try {
                const users = await User.find().skip(current).sort({creationTime: sortType}).limit(limit);
                console.log(`query user list successful.`);
                console.log(users);
                res.status(StatusCodes.OK).json({
                    message: 'query user list successful.',
                    success: true,
                    data: users
                });
        
            } catch (err) {
                console.log(`internal server error. error: ${err}`);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'internal server error',
                    success: false,
                    data: null
                });
            }

        } else {
            console.log(`unauthorized user`);
            res.status(StatusCodes.FORBIDDEN).json({
                message: 'forbidden.',
                success: false,
                data: null
            });
        }
    }
});

//  get data of a specfic user
router.get('/user', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`GET "/api/user" api call failed. api key is missing or incorrect`);
        res.status(StatusCodes.FORBIDDEN).json({
            message: 'forbidden',
            success: false,
            data: null
        });

    } else {
        const userExist = await User.findOne({ _id: req.session.user_id });
        const userRole = userExist? userExist.role : "";
        const isAdmin = userRole == "Admin";
        
        if (userExist && isAdmin) {
            try {
                const { id } = req.query;
                const user = await User.findOne({ _id: id });

                if (user) {
                    console.log('query user successful')
                    res.status(StatusCodes.OK).json({
                        message: 'query user successful.',
                        success: true,
                        data: user
                    });

                } else { 
                    console.log(`user "${id}" not found`);
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: 'user not found.',
                        success: false,
                        data: null
                    });
                }

            } catch (err) {
                console.log(`internal server error. error: ${err}`);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'internal server error',
                    success: false,
                    data: null
                });
            }

        } else {
            console.log(`unauthorized user`);
            res.status(StatusCodes.FORBIDDEN).json({
                message: 'forbidden',
                success: false,
                data: null
            });
        }
    }   
});

// update user data
router.patch('/user', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`PATCH "/api/user" api call failed. api key is missing or incorrect`);
        res.status(StatusCodes.FORBIDDEN).json({
            message: 'forbidden',
            success: false,
            data: null
        });

    } else {
        const userExist = await User.findOne({ _id: req.session.user_id });
        const userRole = userExist? userExist.role : "";
        const isAdmin = userRole == "Admin";

        if (userExist && isAdmin) {
            try {
                const { id } = req.body;
                const user = await User.findOne({ _id: id });
                let { username, password, role, email } = req.body;

                if (user) {
                    user.username = username? username : user.username;
                    user.password = password? await bcrypt.hash(password, 12) : user.password;
                    user.role = role? role : user.role;
                    user.email = email? email : user.email;
                    await user.save();

                    console.log(`user "${id}" info updated successful`);
                    console.log(user);
                    res.status(StatusCodes.OK).json({
                        message: 'user info updated successful.',
                        success: true,
                        data: user
                    });
                    
                } else {
                    console.log(`user "${id}" not found`);
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: 'user not found.',
                        success: false,
                        data: null
                    });
                }

            } catch (err) {
                console.log(`internal server error. error: ${err}`);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'internal server error',
                    success: false,
                    data: null
                });
            }

        } else {
            console.log(`unauthorized user`);
            res.status(StatusCodes.FORBIDDEN).json({
                message: 'forbidden',
                success: false,
                data: null
            });
        }
    }
});

// delete user
router.delete('/user', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`DELETE "/api/user" api call failed. api key is missing or incorrect`);
        res.status(StatusCodes.FORBIDDEN).json({
            message: 'forbidden',
            success: false,
            data: null
        });

    } else {
        const userExist = await User.findOne({ _id: req.session.user_id });
        const userRole = userExist? userExist.role : "";
        const isAdmin = userRole == "Admin";

        if (userExist && isAdmin) {
            try {
                const { id } = req.body;
                const user = await User.findOne({ _id: id });

                if (user) {
                    await user.remove();

                    console.log(`user "${id}" delete successful`);
                    console.log(user);
                    res.status(StatusCodes.OK).json({
                        message: 'user delete successful.',
                        success: true,
                        data: user
                    });
                    
                } else {
                    console.log(`user "${id}" not found`);
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: 'user not found.',
                        success: false,
                        data: null
                    });
                }

            } catch (err) {
                console.log(`internal server error. error: ${err}`);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'internal server error',
                    success: false,
                    data: null
                });
            }

        } else {
            console.log(`unauthorized user`);
            res.status(StatusCodes.FORBIDDEN).json({
                message: 'forbidden',
                success: false,
                data: null
            });
        }
    }
});

module.exports = router;