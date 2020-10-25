var express = require("express");
var connection = require("./connection/connection");
var router = express();
let total = "";
let limit = 5;
let offset = 1;
// get
router.get(`/category`, function (req, res, next) {
  let sqltotal = `SELECT * from category`;
  console.log(req.query.search, "req.query");let sql = `SELECT * from category LIMIT ${req.query.limit ? req.query.limit : limit} OFFSET ${req.query.page ? req.query.page : offset}`;
  let search_sql = `SELECT * FROM category WHERE category LIKE '%${req.query.search}%'`;

  connection.query(sqltotal, function (error, data, fieldslist) {
    connection.query(req.query.search ? search_sql : sql, function (err,rows,fieldslist) {
      if (err) res.send({ data: err.sqlMessage });
      total = data.length;
      res.send({
        data: rows,
        total: total,
      });
    });
  });
});
// post
router.post("/category", (req, res, cb) => {
  
  let data = req.body;

  let sql = `INSERT INTO category (category, date) VALUES ("${data.category}", "${new Date()}");`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.send({
      data: rows,
    });
  });
});
// // delete
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

// // get by id
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

// // update
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
