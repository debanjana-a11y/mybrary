const express = require('express');
const booksDB = require('../model/books');
const router = express.Router();

const books = [
    {
        "Title" : "And Then There Were None",
        "Author" : "Agatha Christie",
        "Genre" : "Mystery",
        "PageCount" : 264,
        "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Image": "book1.png"
    },
    {
        "Title" : "The Handmaid's Tale",
        "Author" : "Margaret Atwood",
        "Genre" : "Drama",
        "PageCount" : 311,
        "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Image": "book2.png"
    },
    {
        "Title" : "The Raven King",
        "Author" : "Maggie Stiefvater",
        "Genre" : "Fantasy",
        "PageCount" : 439,
        "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

const addBookTodb = async (books) => {
    try {
        for (const book of books) {
            if (book.hasOwnProperty("Image") == false) {
                book["Image"] = 'default-cover.jpg';
            }
            console.log(book);
            bookToAdd = new booksDB(book);
            await bookToAdd.save();
        }
    } catch (error) {
        console.error(error);
    }
};

addBookTodb(books);

router.get('/', async (req, res)=> {
    const bookList = await booksDB.find({});
    res.render('books', {reqURL: req.protocol + "://" + req.headers.host, books: bookList});
});

router.get('/addbook', async (req, res)=> {
    res.render('newbook', {reqURL: req.protocol + "://" + req.headers.host, books});
});

router.get('/:id', async (req, res)=> {
    const bookList = await booksDB.find({});
    res.render('show', {reqURL: req.protocol + "://" + req.headers.host, books: bookList, index: parseInt(req.params.id)});
});

module.exports = router;