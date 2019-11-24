const bookModel = require("../models/bookModel.js");

function getBookList(req, res) {
  bookModel.getAllBooks(function (error, results) {
    console.log("Controller RESULTS: " + results);
    res.json(results);
  });
}

function insertNewBook(req, res) {
  var book = "The Hobbit";
  var author = "JRR Tolkien";

  bookModel.insertNewBook(book, author, function (err, results) {
    res.json(results);
  })
}

module.exports = {
  getBookList: getBookList,
  insertNewBook: insertNewBook
}