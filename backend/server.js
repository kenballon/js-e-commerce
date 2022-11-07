const express = require("express");
const cors = require("cors");
const data = require("./data.js");
const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(8080, () => {
  console.log("serve at http://localhost:8080");
});
