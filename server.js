const express = require('express');
const app = express();
const router = require('./routes/index')

PORT = process.env.PORT ?? 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running at port ${PORT}`);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set(express.static('public'));

app.use(router);