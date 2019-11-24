const {
  Pool
} = require("pg");
const db_url = process.env.DATABASE_URL;
console.log("DB URL: " + db_url);
const pool = new Pool({
  connectionString: db_url
});


function getAllBooks() {
  console.log("Listing all books...");


}