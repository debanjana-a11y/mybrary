const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.render('authors', {reqURL: req.protocol + "://" + req.headers.host,
                           name: "Rabindranath Tagore"});
});

module.exports = router;