var express = require("express");
var connection = require("./connection/connection");
var router = express();
let total = "";
let limit = 4;
let offset = 0;
// get
router.get(`/category`, function (req, res, next) {
  let sqltotal = `SELECT * from category `;
  let sql = `SELECT * from category ORDER BY id DESC LIMIT ${
    req.query.limit ? req.query.limit : limit
  } OFFSET ${req.query.page ? req.query.page : offset} `;
  let search_sql = `SELECT * FROM category WHERE category LIKE '%${req.query.search}%' OR description LIKE '%${req.query.search}%'`;

  connection.query(sqltotal, function (error, data, fieldslist) {
    connection.query(req.query.search ? search_sql : sql, function (
      err,
      rows,
      fieldslist
    ) {
      if (err) {
        res.send({ data: err.sqlMessage });
        throw err;
      } else {
        total = data.length;
        res.send({
          data: rows,
          total: total,
        });
      }
    });
  });
});

// post
router.post("/category", (req, res, cb) => {
  let data = req.body;

  let sql = `INSERT INTO category (category,description ,date) VALUES ("${
    data.category
  }","${data.description}", "${new Date()}");`;

  connection.query(sql, function (err, rows, fields) {
    if (err) {
      res.send({
        data: [],
        message: err.sqlMessage,
      });
      throw err;
    } else {
      res.send({
        data: rows,
        message: "Category Added Successfully",
      });
    }
  });
});

// // delete
router.delete("/category/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let body = req && req.body;
  let sql = `DELETE FROM category WHERE id=${id}`;
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      res.send({
        data: err.sqlMessage,
      });
      throw err;
    } else {
      res.send({
        data: body,
        messgae: "Category Deleted Successfully",
      });
    }
  });
});

// // get by id
router.get("/category/:id", (req, res, cb) => {
  let id = req && req.params.id;

  let sql = `SELECT * FROM category WHERE id=${id}`;
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      res.send({
        data: err.sqlMessage,
      });
      throw err;
    } else {
      res.send({
        data: rows[0],
      });
    }
  });
});

// // update
router.put("/category/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let body = req && req.body;
  let sql = `UPDATE category SET category = '${body.category}'and date=${new Date()} WHERE id = ${id};`;
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      res.send({
        data: err.sqlMessage,
        message: "Something Went Wrong",
      });

      throw err;
    } else {
      res.send({
        data: body,
        message: "Category Updated Successfully",
      });
    }
  });
});

module.exports = router;
