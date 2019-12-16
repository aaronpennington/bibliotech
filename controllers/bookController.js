const bookModel = require("../models/bookModel.js");
const express = require("express");
const session = require('express-session');

var sess;

function getBookList(req, res) {
  sess = req.session;
  var user_id = sess.user_id;
  bookModel.getAllBooks(function (error, results) {
    console.log("Controller RESULTS: " + results);
    res.json(results);
  });
}

function insertNewBook(req, res) {
  sess = req.session;
  var user_id = sess.user_id;
  var book = "The Hobbit";
  var author = "JRR Tolkien";

  bookModel.insertNewBook(book, author, function (err, results) {
    res.json(results);
  })
}

function searchBook(req, res) {
  sess = req.session;
  var user_id = sess.user_id;
  var title = req.query.title;
  console.log("TITLE: " + title);
  bookModel.searchBook(title, user_id, function (err, results) {
    res.send(results);
  })
}

function getShelf(req, res) {
  sess = req.session;
  var user_id = sess.user_id;
  var shelf = req.query.shelf;

  bookModel.getShelf(shelf, user_id, function (err, results) {
    res.send(results);
  });
}

function getShelfList(req, res) {
  sess = req.session;
  var user_id = sess.user_id;
  bookModel.getShelfList(user_id, function (err, results) {
    res.send(results);
  })
}

function addBook(req, res) {
  sess = req.session;
  var user_id = sess.user_id;
  var book_id = req.query.book_id;
  bookModel.addBook(book_id, user_id, function (err, results) {
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