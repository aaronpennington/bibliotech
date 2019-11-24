const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({
  extended: true
})); // to support URL-encoded bodies

app.get("/list", getList);
app.get("/product/:productId", getProduct);
app.post("/product", addProduct);

function addProduct(req, res) {
  console.log("Adding new product...");
  const result = {
    success: true
  };

  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;

  res.json(result);
}

function getList(req, res) {
  console.log("Received request for: " + req.url);

  const productList = [{
    id: 1,
    name: "Lindor Truffle"
  }, {
    id: 2,
    name: "Hershey's"
  }, {
    id: 3,
    name: "Score"
  }];

  res.json(productList);
}

function getProduct(req, res) {
  console.log("Getting product details...");
  // const id = req.query.id;
  const id = req.params.productId;

  const productDetails = {
    id: id,
    name: "undefined"
  };
  res.json(productDetails);
}

app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});