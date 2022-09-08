const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const Blog = require('../models/blog.js');
const router = express.Router();

// cms panel
router.get('/cms', async (req, res) => {
    const page = "cms";
    const userId = req.session.user_id;
    if (userId) {
        const user = await User.findOne({ _id: userId });
        const username = user.username;
        console.log('redirecting to cms');
        res.render('cms/cms.ejs', { page, username });
    } else {
        console.log('redirecting to cms login page');
        res.render('cms/cms-login.ejs');
    }
});

// login page
router.get('/admin/login', (req, res) => {
    res.render('cms/cms-login.ejs');
});
// login
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
        const passwordIsValid = await bcrypt.compare(password, user.password);

        try {
            if (passwordIsValid) {
                // password correct
                console.log('user login successful');
                req.session.user_id = user._id;
                res.redirect('/cms');
            }
            if (!passwordIsValid) {
                // password not correct
                console.log('user password not correct');
                res.redirect('/admin/login');
            }
        } catch (err) {
            // DB error
            console.log('server error: ' + err);
            res.redirect('/admin/login');
        }
    } else {
        // user not exist
        console.log('user not exist');
        res.redirect('/admin/login');
    }
});

/** CMS APIs - User **/
//  create new user
router.post('/user/create', async (req, res) => {
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
        console.log('create user successful');
        await user.save();
        console.log('saved user data to mongoDB');

        req.session.user_id = user._id;
        res.render('cms/cms.ejs');

    } catch (err) {
        console.log('create user failed' + err);
        res.render('cms/cms-login.ejs');
    }
});
//  get user data
router.post('/user', async (req, res) => {
    const userId = req.session.user_id;
    const user = await User.findOne({ _id: userId });
    try {
        if (user && user.role == 'Admin') {
            const allUsers = await User.find();
            // const data = {
            //     user: allUsers
            // }
            res.json( allUsers );
        } else {
            console.log('no permission to retrieve user data');
        }
    } catch (err) {
        console.log('server error: ' + err);
    }
});

/** CMS APIs - Blog **/
//  create blog post
router.post('/blog', async (req, res) => {
    const blog = new Blog({
        title: "testing",
        description: "testing"
    });
    try { await blog.save();
    } catch { console.log() }
});

// read blog post

// update blog post

// delete blog post


// files
router.get('/get-file/cv', (req, res) => {
    res.sendFile('Kai_Fung_Wong_-_Front-end_Developer.pdf', { root: path.join(__dirname, './public/assets/about/') });
});
router.get('/get-file/udemy-certification', (req, res) => {
    res.sendFile('udemy-certification.pdf', { root: path.join(__dirname, './public/assets/about/') });
});


module.exports = router;