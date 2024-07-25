const express = require('express');
const booksDB = require('../model/books');
const router = express.Router();
const fs = require('fs');

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

let defaultName = 'default-cover.jpg';

const addBookTodb = async (books) => {
	try {
		for (const book of books) {
			let coverName = defaultName;
            if (book.hasOwnProperty("Image")) {
				coverName = book["Image"];
			}
			book.Image = fs.readFileSync(__dirname + '/../public/images/' + coverName, 'base64');
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

router.post('/', async (req, res) => {
	try {
		const reqBody = req.body;
		const addBook = new booksDB({
			Title: reqBody.Title,
			Author: reqBody.Author,
			PageCount: reqBody.PageCount,
			Genre: reqBody.Genre,
			Description: reqBody.Description,
			Image: reqBody.Image ? reqBody.Image : ''
		});

		if (reqBody.Image) {
			const cover = JSON.parse(reqBody.Image);
			addBook.Image = cover.data;
		} else {
			addBook.Image = fs.readFileSync(__dirname + '/../public/images/' + defaultName, 'base64');
		}

		const ret = await addBook.save();
		res.redirect('/books');
	} catch (error) {
		console.error('Failed to add book, reason :: ' + error);
		res.redirect('/books');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		let book = await booksDB.findById(req.params.id).exec();
		if (book === null) {
			res.redirect('/');
			console.log('Book does not exist in DB to be deleted');
			return;
		}
		book = await booksDB.deleteOne({ _id: req.params.id });
		console.log('Deleted book ' + JSON.stringify(book));
		const bookList = await booksDB.find({});
		res.render('books', {
			reqURL: req.protocol + '://' + req.headers.host,
			books: bookList,
		});
	} catch (error) {
		console.error('Failed to delete book, reason :: ' + error);
		res.redirect('/books');
	}
});

router.get('/newbook', async (req, res) => {
	res.render('bookForm', { reqURL: req.protocol + '://' + req.headers.host,
		action: "Add"
	 });
});

router.get('/:id', async (req, res) => {
	const book = await booksDB.findById(req.params.id).exec();
	if (book === null) {
		res.redirect('/');
		return;
	}
	res.render('show', {
		reqURL: req.protocol + '://' + req.headers.host,
		book: book,
	});
});

router.get('/editbook/:id', async (req, res) => {
	const book = await booksDB.findById(req.params.id).exec();
	if (book === null) {
		res.redirect('/');
		return;
	}
	res.render('bookForm', { reqURL: req.protocol + '://' + req.headers.host,
		book: book,
		action: "Edit"
	 });
});		

router.put('/editbook/:id', async (req, res) => {
	const book = await booksDB.findById(req.params.id).exec();
	if (book === null) {
		res.redirect('/');
		return;
	}
	// Save Cover
	if (req.body.Image != null && req.body.Image != undefined && req.body.Image != "") {
		const encodedCover = JSON.parse(req.body.Image);
		book.Image = encodedCover.data;
	}
	let updatedBook = await booksDB.findOneAndUpdate({ _id: req.params.id },
		{
			Title : req.body.Title,
			Author : req.body.Author,
			Genre : req.body.Genre,
			PageCount : req.body.PageCount,
			Description : req.body.Description,
			Image: book.Image
		},
		{returnOriginal: false}
	);
	// console.debug("Updated Book :" + JSON.stringify(updatedBook));

	const bookList = await booksDB.find({});
	res.render('books', {
		reqURL: req.protocol + '://' + req.headers.host,
		books: bookList,
	});
});

module.exports = router;
