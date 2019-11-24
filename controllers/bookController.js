const bookModel = require("../models/bookModel.js");

function getBookList(req, res) {
  bookModel.getAllBooks(function (error, results) {
    console.log("Controller RESULTS: " + results);
    res.json(results);
  });
}

module.exports = {
  getBookList: getBookList
}