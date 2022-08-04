const bcrypt = require("bcryptjs");
const con = require("../../lib/dbConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function addProduct(req, res) {
  if (req.user.user_type === "admin") {
    const {
      sku,
      name,
      price,
      weight,
      descriptions,
      thumbnail,
      image,
      category,
      stock,
    } = req.body;

    const create_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      con.query(
        `INSERT INTO products (sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock) VALUES ("${sku}","${name}","${price}","${weight}","${descriptions}","${thumbnail}","${image}","${category}","${create_date}","${stock}")`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not valid user");
  }
}

module.exports = {
  addProduct,
};
