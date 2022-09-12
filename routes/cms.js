const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const Blog = require('../models/blog.js');
const router = express.Router();


// cms panel
router.get('/cms', async (req, res) => {
    const page = "cms";
    const currListing = req.query.currListing? req.query.currListing : 'user';
    const userId = req.session.user_id;

    if (userId) {
        const user = await User.findOne({ _id: userId });
        const username = user.username;
        console.log('redirecting to cms');
        res.render('cms/cms.ejs', { page, username, currListing });
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
        await user.save();
        console.log('create user successful');
        console.log('saved user data to mongoDB');

        res.redirect('/cms');

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
            res.json( allUsers );
        } else { console.log('no permission to retrieve user data') }

    } catch (err) {
        console.log('server error: ' + err);
        res.sendStatus(401);
    }
});

/** CMS APIs - Blog **/
//  create blog post
router.post('/blog-post/create', async (req, res) => {
    const { status, type, title, description, tags } = req.body;
    console.log(`${status}, ${type}, ${title}, ${description}, ${tags}`);
    console.log(typeof(tags));
    console.log(tags);

    const blog = new Blog({
        status: status,
        type: type,
        title: title,
        description: description,
        tags: JSON.parse(tags),
        views: 0,
        creationTime: Date.now(),
        modificationTime: Date.now()
    });
    try { 
        await blog.save();
        console.log('create blog post successful' );
        console.log('saved blog post data to mongoDB');
        console.log(blog);
        res.sendStatus(200);

    } catch(err) { 
        console.log('create user failed' + err) 
        res.sendStatus(401);
    }
});

// retrieve blog post
router.post('/blog-post', async (req, res) => {
    // const userId = req.session.user_id;
    // const user = await User.findOne({ _id: userId });
    const blogId = req.body.id;
    const status = req.body.status;

    if (blogId) {
        // retrieve a specfic blog post
        try {
            const blog = await Blog.find({ _id: blogId });
            console.log(blog);
            res.json( blog );
        } catch (err) {
            console.log('server error: ' + err);
            res.sendStatus(401);
        }

    } else {
        try {
            if (status) {
                // front-end
                const allBlogs = await Blog.find({ status }).sort({creationTime: -1}).limit(5);
                res.json(allBlogs);
            } else {
                // cms
                const allBlogs = await Blog.find().sort({creationTime: -1});
                res.json(allBlogs);
            }
        } catch (err) {
            console.log('server error: ' + err);
            res.sendStatus(401);
        }
    }
    
});

// update blog post

// delete blog post


module.exports = router;