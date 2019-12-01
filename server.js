const express = require('express');
const path = require('path')
const app = express();

const bookController = require("./controllers/bookController.js");

const port = process.env.PORT || 5000;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({
  extended: true
})); // to support URL-encoded bodies

// EXAMPLE API CALL: https://www.goodreads.com/search/index.xml?key=CByUHqQdOsPZDGkNX44onQ&q=Ender%27s+Game

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.render('/index'));
app.get("/list", bookController.getBookList);
app.get("/search", bookController.searchBook);
app.get("/review/list", bookController.getShelf);
app.get("/shelf/list", bookController.getShelfList);
app.post("/book", bookController.insertNewBook);
app.post("/shelf/add_to_shelf", bookController.addBook);


app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});