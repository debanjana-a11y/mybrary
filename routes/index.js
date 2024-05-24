const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home', { reqURL: req.protocol + '://' + req.headers.host });
});

module.exports = router;