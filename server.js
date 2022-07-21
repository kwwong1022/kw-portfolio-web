const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
// app.use(cors({origin: '*',}));

// mongo connection
mongoose.connect('mongodb+srv://kwwong1022:f38k9494@cluster0.x7nst.mongodb.net/portfolio', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('mongoDB connection open');
})
.catch((err) => {
    console.log(err);
});


// routes
app.get('/', (req, res) => {
    const page = "home";
    res.render('home.ejs', {page});
});
app.get('/home', (req, res) => {
    const page = "home";
    res.render('home.ejs', {page});
});
app.get('/about', (req, res) => {
    const page = "about";
    res.render('about.ejs', {page});
});
app.get('/works', async (req, res) => {
    const page = "works";
    const work = req.query.work;
    res.render('works.ejs', {page, work});
});
app.get('/contact', (req, res) => {
    const page = "contact";
    res.render('contact.ejs', {page});
});


// files
app.get('/get-file/cv', (req, res) => {
    res.sendFile('Kai_Fung_Wong_-_Junior_Front-end_Developer.pdf', { root: path.join(__dirname, './public/assets/about/') });
});
app.get('/get-file/udemy-certification', (req, res) => {
    res.sendFile('udemy-certification.pdf', { root: path.join(__dirname, './public/assets/about/') });
});


// error handling
app.get('*', (req, res) => {
    res.render('404.ejs');
});


// deploy
app.listen(PORT, () => {
    console.log(`app deployed on port ${PORT}`);
});