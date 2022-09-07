const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const Blog = require('../models/blog.js');
const router = express.Router();

// cms panel
router.get('/cms', (req, res) => {
    const page = "cms";
    if (req.session.user_id) {
        res.render('cms/cms.ejs', { page });
    } else {
        res.render('cms/cms-login.ejs');
    }
});

/** CMS APIs - User **/
// login
router.get('/admin/login', (req, res) => {
    res.render('cms/cms-login.ejs');
});

// authentication
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
        const passwordIsValid = await bcrypt.compare(password, user.password);

        try {
            if (passwordIsValid) {
                req.session.user_id = user._id;
                res.redirect('/cms');
            }
        } catch (err) {
            console.log(err);
        }
    }
});

// create new user
router.post('/user/create', async (req, res) => {
    const { username, password } = req.body;
    const hashedPwd = await bcrypt.hash(password, 12);

    try {
        const user = new User({
            username,
            password: hashedPwd
        })
        await user.save();

        req.session.user_id = user._id;
        res.render('cms/cms.ejs');

    } catch (err) {
        console.log(err);
        res.render('cms/cms-login.ejs');
    }
})

/** CMS APIs - Blog **/
// create blog post
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