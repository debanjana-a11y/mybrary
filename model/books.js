// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    "Title" : { type: String, required: true, unique: true },
    "Author" : String,
    "Genre" : String,
    "PageCount" : Number,
    "Description" : String,
    "Image": String
});

// It is like adding a table/collection to a database which is connected via mongoose.connect
module.exports = mongoose.model('bookCollection', bookSchema);
