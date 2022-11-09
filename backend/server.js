import express from "express";
import cors from "cors";
import data from "./data.js";

const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id == req.params.id);
  product
    ? res.send(product)
    : res.status(404).send({ message: "This product cannot be found!" });
});

app.listen(8080, () => {
  console.log("serve at http://localhost:8080");
});
