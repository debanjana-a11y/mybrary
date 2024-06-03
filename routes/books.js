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
        "Description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Image": "book3.png"
    }
];

const addBookTodb = async (books) => {
    try {
        for (const book of books) {
            if (book.hasOwnProperty("Image") == false) {
                book["Image"] = 'default-cover.jpg';
            }
            bookToAdd = new booksDB(book);
            console.log(await bookToAdd.save());
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

router.post('/', async (req, res)=> {
    try {
        const reqBody = req.body;
        const addBook = new booksDB({
            "Title": reqBody.Title,
            "Author": reqBody.Author,
            "PageCount": reqBody.PageCount,
            "Genre": reqBody.Genre,
            "Description": reqBody.Description,
            "Image": reqBody.Image? reqBody.Image : 'default-cover.jpg'
        });
        const ret = await addBook.save();
        console.log(ret);
        const bookList = await booksDB.find({});
        res.render('books', {reqURL: req.protocol + "://" + req.headers.host, books: bookList});
    } catch (error) {
        console.error("Failed to add book, reason :: " + error);
        res.redirect('/books');
    }
});

router.delete('/:id', async (req, res)=> {
    try {
        let book = await booksDB.findById(req.params.id).exec();
        if (book === null) {
            res.redirect('/');
            console.log("Book does not exist in DB to be deleted");
            return;
        }
        book = await booksDB.deleteOne({ _id: req.params.id });
        console.log("Deleted book " + JSON.stringify(book));
        const bookList = await booksDB.find({});
        res.render('books', {reqURL: req.protocol + "://" + req.headers.host, books: bookList});
    } catch (error) {
        console.error("Failed to delete book, reason :: " + error);
        res.redirect('/books');
    }
});

router.get('/newbook', async (req, res)=> {
    res.render('newbook', {reqURL: req.protocol + "://" + req.headers.host});
});

router.get('/:id', async (req, res)=> {
    const book = await booksDB.findById(req.params.id).exec();
    if (book === null) {
        res.redirect('/');
        return;
    }
    res.render('show', {reqURL: req.protocol + "://" + req.headers.host, book: book});
});

module.exports = router;