const express = require('express');
const User = require('../../models/user.js');
const Blog = require('../../models/blog.js');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();
require('dotenv').config();

// create blog post
router.post('/', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`POST "/api/blogpost" api call failed. api key is missing or incorrect`);
        res.status(StatusCodes.FORBIDDEN).json({
            message: 'forbidden',
            success: false,
            data: null
        });

    } else {
        const { status, type, title, thumbnail, description, tags, data } = req.body;
        const blog = new Blog({
            status: status,
            type: type,
            title: title,
            thumbnail: thumbnail,
            description: description,
            tags: JSON.parse(tags),
            data: JSON.parse(data),
            views: 0,
            creationTime: Date.now(),
            modificationTime: Date.now()
        });

        try { 
            await blog.save();
            console.log('create blog post successful, saved blog post to mongoDB');
            console.log(blog);
            res.status(StatusCodes.OK).json({
                message: 'create user successful.',
                success: true,
                data: blog
            });

        } catch(err) { 
            console.log(`internal server error. error: ${err}`);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'internal server error',
                success: false,
                data: null
            });
        }
    }
});

// get blog posts
router.get('/', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`GET "/api/blogpost" api call failed. api key is missing or incorrect`);
        res.status(StatusCodes.FORBIDDEN).json({
            message: 'forbidden',
            success: false,
            data: null
        });

    } else {
        const { limit=10, current=0, sortType='desc', status, type, sortView=false } = req.query;
        let sort = sortView? {views: sortType} : {creationTime: sortType};
        let filter = {};
        if (status) filter.status = status;
        if (type) filter.type = type;

        try {
            const blogs = await Blog.find(filter).skip(current).sort(sort).limit(limit);
            console.log(`query blog post list successful`);
            res.status(StatusCodes.OK).json({
                message: 'query blog post list successful.',
                success: true,
                data: blogs
            });

        } catch (err) {
            console.log(`internal server error. error: ${err}`);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'internal server error',
                success: false,
                data: null
            });
        }
    }
});

// get a specfic blog post
router.get('/detail', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`GET "/api/blogpost/detail" api call failed. api key is missing or incorrect`);
        res.status(StatusCodes.FORBIDDEN).json({
            message: 'forbidden',
            success: false,
            data: null
        });

    } else {
        const { id } = req.query;

        try {
            const blog = await Blog.findOne({ _id: id });
            if (blog) {
                let views = blog.views+1;
                blog.views = views;
                await blog.save();

                console.log(`query blog post "${id}" successful`);
                res.status(StatusCodes.OK).json({
                    message: 'query blog post successful.',
                    success: true,
                    data: blog
                });

            } else { 
                console.log(`blog post "${id}" not found`);
                res.status(StatusCodes.NOT_FOUND).json({
                    message: 'blog post not found.',
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
    }
});

// update blog post
router.patch('/', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`PATCH "/api/blogpost" api call failed. api key is missing or incorrect`);
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
            const { id } = req.body;
            const blog = await Blog.findOne({ _id: id });

            if (blog) {
                let { status, type, title, thumbnail, description, tags, data } = req.body;
                blog.status = status? status : blog.status;
                blog.type = type? type : blog.type;
                blog.title = title? title : blog.title;
                blog.thumbnail = thumbnail? thumbnail : blog.thumbnail;
                blog.description = description? description : blog.description;
                blog.tags = tags? JSON.parse(tags) : blog.tags;
                blog.data = data? JSON.parse(data) : blog.data;
                await blog.save();

                console.log(`blog post "${id}" updated successful`);
                console.log(blog);
                res.status(StatusCodes.OK).json({
                    message: 'blog post updated successful.',
                    success: true,
                    data: blog
                });

            } else {
                console.log(`blog post "${id}" not found`);
                res.status(StatusCodes.NOT_FOUND).json({
                    message: 'blog post not found.',
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

// delete blog post
router.delete('/', async (req, res) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != process.env.API_KEY) {
        console.log(`DELETE "/api/blogpost" api call failed. api key is missing or incorrect`);
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
                const blog = await Blog.findOne({ _id: id });

                if (blog) {
                    await blog.remove();

                    console.log(`blog post "${id}" delete successful`);
                    console.log(blog);
                    res.status(StatusCodes.OK).json({
                        message: 'blog post delete successful.',
                        success: true,
                        data: blog
                    });
                    
                } else {
                    console.log(`blog post "${id}" not found`);
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: 'blog post not found.',
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