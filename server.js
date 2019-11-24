const express = require('express');
const path = require('path')
const app = express();

const bookController = require("./controllers/bookController.js");

const port = process.env.PORT || 5000;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({
  extended: true
})); // to support URL-encoded bodies

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.render('/index'));
app.get("/list", bookController.getBookList);


app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});