const express = require('express');

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
router.get('/blog/post', (req, res) => {
    const page = "blog-post";
    // postId
    res.render('blog-post.ejs', {page});
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