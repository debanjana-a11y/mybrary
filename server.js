const express = require('express');
const app = express();
const homeRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const redirectRouter = require('./routes/redirect');
const path = require("path");

PORT = process.env.PORT ?? 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running at port ${PORT}`);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('*', redirectRouter);