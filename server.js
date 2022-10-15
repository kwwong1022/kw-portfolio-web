const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const path = require("path");
const { StatusCodes } = require('http-status-codes');

const app = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config();
app.use(session({secret: 'session here', resave: false, saveUninitialized: true}));

// mongo connection
mongoose.connect('mongodb+srv://kennwong:Wel$Kw2210@atlas-portfolio.hoy5yn8.mongodb.net/cms', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('mongoDB connection open'))
.catch((err) => console.log(`mongoDB connection failed. error: ${err}`));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// web path
app.use(require('./routes/portfolio'));
app.use(require('./routes/cms'));

// APIs
app.use('/api', require('./routes/api/index.js'));

app.get('/privacy-policy', (req, res) => {
    res.status(StatusCodes.OK).render('privacy-policy.ejs');
});
app.get('/terms-and-conditions', (req, res) => {
    res.status(StatusCodes.OK).render('terms.ejs');
});

// files
app.get('/get-file/cv', (req, res) => {
    res.status(StatusCodes.OK).sendFile('Kai_Fung_Wong_-_Front-end_Developer.pdf', { root: path.join(__dirname, './public/assets/about/') });
});
app.get('/get-file/udemy-certification', (req, res) => {
    res.status(StatusCodes.OK).sendFile('udemy-certification.pdf', { root: path.join(__dirname, './public/assets/about/') });
});

// health check
app.get('/status', (req, res) => {
    res.sendStatus(StatusCodes.OK);
})

// error handling
app.get('*', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).render('404.ejs');
});

// deploy
app.listen(PORT, () => console.log(`app deployed on port ${PORT}`));