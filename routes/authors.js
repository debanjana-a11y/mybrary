const express = require('express');
const router = express.Router();

authorList = ['Agatha Christie', 'Margaret Atwood', 'Maggie Stiefvater'];

router.get('/', (req, res) => {
	res.render('authors', {
		reqURL: req.protocol + '://' + req.headers.host,
		authors: authorList,
	});
});

module.exports = router;
