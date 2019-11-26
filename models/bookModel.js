const {
  Pool
} = require("pg");
const db_url = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: db_url
});

const fetch = require("node-fetch");

// const fs = require("fs");
// fs.readFile('apikey.txt', 'utf8', function (err, contents) {
//   if (err) throw err;
//   let apikey = contents;
// });


function getAllBooks(callback) {
  console.log("Listing all books...");

  var query = "SELECT book.title, author.full_name FROM book, author WHERE book.author = author.id;"
  pool.query(query, function (err, db_results) {
    if (err) {
      throw err;
    } else {
      var results = {
        success: true,
        list: db_results.rows
      };

      callback(null, results);
    }
  });
}

function insertNewBook(title, author, callback) {
  var query = "INSERT INTO book (title, author) VALUES('Lion, Witch, Wardrobe', 2);";
  pool.query(query, function (err, db_results) {
    if (err) {
      throw err;
    } else {
      var results = {
        success: true,
        list: db_results.rows
      };

      callback(null, results);
    }
  });
}

function searchBook(title, callback) {
  var query = "https://www.goodreads.com/search/index.xml?key=" + "CByUHqQdOsPZDGkNX44onQ" + "&q=" + encodeURIComponent(title);
  console.log(query);
  fetch(query).then(function (response) {
      return response.text();
    })
    .then(function (data) {
      callback(null, data);
    })
}

module.exports = {
  getAllBooks: getAllBooks,
  searchBook: searchBook
};