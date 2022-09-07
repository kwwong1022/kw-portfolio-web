const express = require('express');
const User = require('../models/user.js');
const Blog = require('../models/blog.js');

const router = express.Router();


// cms panel
router.get('/cms', (req, res) => {
    const page = "cms";
    // if not logged in -> redirect to /admin/login
    res.render('cms/cms.ejs', {page});
});

/** CMS APIs - User **/
// login
router.get('/admin/login', (req, res) => {
    const page = "cms-login";
    res.render('cms/cms-login.ejs', {page});
});

// create new user

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


module.exports  = router;