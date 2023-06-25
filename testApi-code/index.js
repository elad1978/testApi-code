const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8070;

let products = [
  { id: 1, name: "ASUS-nf1", price: 5000, category: "lep-tops" },
  { id: 2, name: "Galaxy", price: 3000, category: "phones" },
  { id: 3, name: "Galaxy2", price: 3500, category: "phones" },
];

let id = 4;

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:category", (req, res) => {
  const category = req.params.category;
  if (!category) {
    res.status(400).send("there in no category");
    return;
  }
  const catProducts = products.filter((p) => p.category == category);
  if (!catProducts) {
    res.status(404).send("no data was found");
    return;
  }
  res.json(catProducts);
});

app.post("/api/products", jsonParser, (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price) {
    res.status(400).send("there is missing data");
    return;
  }
  const product = { id: id++, name: name, price: price, category: category };
  products.push(product);
  res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("there in no id");
    return;
  }
  const product = products.find((p) => p.id == id);
  if (!product) {
    res.status(404).send("no data was found");
    return;
  }
  products = products.filter((p) => p.id != id);
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
