const express = require('express');
const route = express.Router();

route.get('/', (req, res)=> {
    res.render('home', {reqURL: req.protocol + "://" + req.headers.host});
});

route.get('/books', (req, res)=> {
    res.render('books', {reqURL: req.protocol + "://" + req.headers.host,
                        title: "Pride and Prejudice",
                        description: "classic love story"});
});

route.get('/authors', (req, res)=> {
    res.render('authors', {reqURL: req.protocol + "://" + req.headers.host,
                           name: "Rabindranath Tagore"});
});

route.get('*', (req, res)=> {
    res.redirect('/');
});

module.exports = route;