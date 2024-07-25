const express = require('express');
const router = express.Router();
const booksDB = require('../model/books');

authorList = [];

router.get('/', async (req, res) => {
	const bookList = await booksDB.find({});
	bookList.forEach(book => {
		authorList.push(book.Author);
	});
	res.render('authors', {
		reqURL: req.protocol + '://' + req.headers.host,
		authors: authorList,
	});
});

module.exports = router;
