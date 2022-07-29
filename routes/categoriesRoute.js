const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
// GET ALL CATEGORIES
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
// GET ONE CATEGORY
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM categories where category_id =${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
// POST
router.post("/", (req, res) => {
  const { name, description, thumbnail } = req.body;

  try {
    con.query(
      `INSERT into categories (name,description,thumbnail) values ("${name}", "${description}}", "${thumbnail}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// PUT
router.put("/:id", (req, res) => {
  const {
    name,
    description,
    thumbnail
  } = req.body;
  try {
    con.query(
      `UPDATE categories SET name="${name}",description="${description}",thumbnail="${thumbnail}" WHERE category_id=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// DELETE
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE from categories WHERE category_id="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
