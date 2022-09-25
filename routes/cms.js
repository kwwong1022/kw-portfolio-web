const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();


// login
router.get('/user/login', (req, res) => {
    res.status(StatusCodes.OK).render('cms/cms-login.ejs');
});

// login
router.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    try {
        if (user) {
            const passwordIsValid = await bcrypt.compare(password, user.password);
    
            if (passwordIsValid) {
                // password correct
                console.log(`user "${user.username}" login successful, redirecting to cms page`);
                req.session.user_id = user._id;
                res.status(StatusCodes.OK).redirect('/cms');
            } else {
                // password not correct
                console.log('login failed, user password not correct');
                res.status(StatusCodes.UNAUTHORIZED).redirect('/user/login');
            }
        } else {
            // user not exist
            console.log('login failed, user not exist');
            res.status(StatusCodes.UNAUTHORIZED).redirect('/user/login');
        }

    } catch (err) {
        console.log(`internal server error: error${err}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error',
            success: false,
            data: null
        });
    }
});

// cms
router.get('/cms', async (req, res) => {
    const page = "cms";
    const currListing = req.query.currListing? req.query.currListing : 'user';
    const userId = req.session.user_id;

    if (userId) {
        const user = await User.findOne({ _id: userId });
        if (user) {
            const username = user.username;
            console.log(`user "${username}" found, redirecting to cms`);
            console.log(user);
            res.status(StatusCodes.OK).render('cms/cms.ejs', { page, username, currListing });
        } else {
            console.log(`user "${username}" not found, redirecting to cms login page`);
            res.status(StatusCodes.NOT_FOUND).render('cms/cms-login.ejs');
        }
    } else {
        console.log('redirecting to cms login page');
        res.status(StatusCodes.UNAUTHORIZED).render('cms/cms-login.ejs');
    }
});


module.exports = router;