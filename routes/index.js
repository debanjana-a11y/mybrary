const express = require('express');
const route = express.Router();

route.get('/', (req, res)=> {
    res.render('home');
});

route.get('/books', (req, res)=> {
    res.render('books', {title: "Pride and Prejudice", description: "classic love story"});
});

route.get('/authors', (req, res)=> {
    res.render('authors', {name: "Rabindranath Tagore"});
});

route.get('*', (req, res)=> {
    res.redirect('/');
});

module.exports = route;