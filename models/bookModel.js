const {
  Pool
} = require("pg");
const db_url = process.env.DATABASE_URL;
console.log("DB URL: " + db_url);
const pool = new Pool({
  connectionString: db_url
});


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

module.exports = {
  getAllBooks: getAllBooks
};