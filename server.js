const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const path = require("path");
const portfolioRouter = require('./routes/portfolio');
const cmsRouter = require('./routes/cms');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(session({secret: 'session here', resave: false, saveUninitialized: true}));

// mongo connection
mongoose.connect('mongodb+srv://kennwong:Wel$Kw2210@atlas-portfolio.hoy5yn8.mongodb.net/cms', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('mongoDB connection open'))
.catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(portfolioRouter);
app.use(cmsRouter);

// error handling
app.get('*', (req, res) => {
    res.render('404.ejs');
});

// deploy
app.listen(PORT, () => console.log(`app deployed on port ${PORT}`));