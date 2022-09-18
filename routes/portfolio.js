const express = require('express');
const Blog = require('../models/blog.js');
const router = express.Router();


// public routes
router.get('/', (req, res) => {
    const page = "home";
    res.render('home.ejs', {page});
});
router.get('/home', (req, res) => {
    const page = "home";
    res.render('home.ejs', {page});
});
router.get('/about', (req, res) => {
    const page = "about";
    res.render('about.ejs', {page});
});
router.get('/blog', (req, res) => {
    const page = "blog";
    res.render('blog.ejs', {page});
});
router.get('/blog/:id', async (req, res) => {
    const page = "blog";
    const id = req.params.id;

    try {
        const blog = await Blog.findById({ _id: id });
        
        if (blog) {
            const title = blog.title;
            res.render('blog-post.ejs', { page, id, title });
        } else {
            console.log('blog post not found')
            res.redirect('/blog');
        }
    } catch (err) {
        console.log('server error: ' + err)
        res.redirect('/blog');
    }
});
router.get('/works', async (req, res) => {
    const page = "works";
    const work = req.query.work;
    res.render('works.ejs', {page, work});
});
router.get('/contact', (req, res) => {
    const page = "contact";
    res.render('contact.ejs', {page});
});


module.exports  = router;