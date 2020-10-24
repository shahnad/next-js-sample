var express = require("express");
var connection = require("./connection/connection");
var router = express();
let order = "";
let param = "";
let offset = "";
let search = "";

// get
router.get("/category", function (req, res, next) {
  console.log(req.query, "ss");
  if (req && req.query) {
    limit = req.query.range[1];
    offset = req.query.range[0];
    param = req.query.sort[0];
    order = req.query.sort[1];
  }

  let filter = JSON.parse(req.query && req.query.filter);

  if (filter && filter.q) {
    search = filter.q;
  } else {
    search = "";
  }
  let sql2 = `SELECT * from category`;
  let sql = `SELECT * FROM category WHERE category LIKE '%${search}%' ORDER BY ${param} ${order} LIMIT ${limit} OFFSET ${offset}`;

  connection.query(sql, function (err, rows, fields) {
    connection.query(sql2, function (error, data, fieldslist) {
      if (err) throw err;
      res.send({
        data: rows,
        total: data.length,
      });
    });
  });
});
// post
router.post("/category", (req, res, cb) => {
  console.log(req.body, "req");
  let data = req.body;

  let sql = `INSERT INTO category (category, date) VALUES ("${
    data.category
  }", "${new Date()}");`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.send({
      data: rows,
    });
  });
});
// delete
router.delete("/category/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let body = req && req.body;
  let sql = `DELETE FROM category WHERE id=${id}`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.send({
      data: body,
    });
  });
});

// get by id
router.get("/category/:id", (req, res, cb) => {
  let id = req && req.params.id;

  let sql = `SELECT * FROM category WHERE id=${id}`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.send({
      data: rows,
    });
  });
});

// update
router.put("/category/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let body = req && req.body;
  let sql = `UPDATE category SET category = '${body.category}' WHERE id = ${id};`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.send({
      data: body,
    });
  });
});

module.exports = router;
