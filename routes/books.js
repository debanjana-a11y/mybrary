const express = require('express');
const router = express.Router();

books = [
    {
        "Title" : "And Then There Were None",
        "Author" : "Agatha Christie",
        "Genre" : "Mystery",
        "PageCount" : 264,
        "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Image": "book1"
    },
    {
        "Title" : "The Handmaid's Tale",
        "Author" : "Margaret Atwood",
        "Genre" : "Drama",
        "PageCount" : 311,
        "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Image": "book2"
    },
    {
        "Title" : "The Raven King",
        "Author" : "Maggie Stiefvater",
        "Genre" : "Fantasy",
        "PageCount" : 439,
        "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Image": "book3"
    }
];

router.get('/', (req, res)=> {
    res.render('books', {reqURL: req.protocol + "://" + req.headers.host, books});
});

router.get('/:id', (req, res)=> {
    res.render('show', {reqURL: req.protocol + "://" + req.headers.host, books, index: parseInt(req.params.id)});
});

module.exports = router;