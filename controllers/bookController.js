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

function searchBook(req, res) {
  var title = req.query.title;
  console.log("TITLE: " + title);
  bookModel.searchBook(title, function (err, results) {
    res.send(results);
  })
}

function getShelf(req, res) {
  var shelf = req.query.shelf;

  bookModel.getShelf(shelf, function (err, results) {
    res.send(results);
  });
}

function getShelfList(req, res) {
  bookModel.getShelfList(function (err, results) {
    res.send(results);
  })
}

function addBook(req, res) {
  var book_id = req.query.book_id;
  bookModel.addBook(book_id, function (err, results) {
    res.send(results);
  })
}

module.exports = {
  getBookList: getBookList,
  insertNewBook: insertNewBook,
  searchBook: searchBook,
  getShelf: getShelf,
  getShelfList: getShelfList,
  addBook: addBook
}