const express = require('express');
const Blog = require('../models/blog.js');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();


router.get('/', (req, res) => {
    const page = "home";
    res.status(StatusCodes.OK).render('home.ejs', {page});
});

router.get('/home', (req, res) => {
    const page = "home";
    res.status(StatusCodes.OK).render('home.ejs', {page});
});

router.get('/about', (req, res) => {
    const page = "about";
    res.status(StatusCodes.OK).render('about.ejs', {page});
});

router.get('/blog', (req, res) => {
    const page = "blog";
    res.status(StatusCodes.OK).render('blog.ejs', {page});
});

router.get('/blog/:id', async (req, res) => {
    const page = "blog";
    const id = req.params.id;

    try {
        const blog = await Blog.findById({ _id: id });
        
        if (blog) {
            const title = blog.title;
            res.status(StatusCodes.OK).render('blog-post.ejs', { page, id, title });
        } else {
            console.log(`blog post "${id}" not found. redirecting to "/blog"`);
            res.status(StatusCodes.NOT_FOUND).render('404.ejs');
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

router.get('/works', async (req, res) => {
    const page = "works";
    const work = req.query.work;
    res.status(StatusCodes.OK).render('works.ejs', {page, work});
});

router.get('/contact', (req, res) => {
    const page = "contact";
    res.status(StatusCodes.OK).render('contact.ejs', {page});
});


module.exports  = router;