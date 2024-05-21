const express = require('express');
const app = express();
const router = require('./routes/index');
const path = require("path");

PORT = process.env.PORT ?? 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running at port ${PORT}`);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);