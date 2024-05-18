const express = require('express');
const route = express.Router();

route.get('/book', (req, res)=> {
    res.render('books', {title: "Pride and Prejudice", description: "classic love story"});
});

route.get('/other', (req, res)=> {
    res.render('books', {title: "Hobbit", description: "fantasy"});
});

module.exports = route;