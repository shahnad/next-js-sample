var express = require("express");
var connection = require("./connection/connection");
var router = express();
let order = "";
let param = "";
let limit = "";
let offset = "";
let search = "";

// get
router.get("/types", function (req, res, next) {
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

  let sql = `SELECT * FROM type WHERE name LIKE '%${search}%' ORDER BY ${param} ${order} LIMIT ${limit} OFFSET ${offset}`;
  let sqltotal = `SELECT * FROM type`;
  connection.query(sql, function (err, rows, fields) {
    connection.query(sqltotal, function (error, data, cb) {
      if (err) throw err;
      res.send({
        data: rows,
        total: data.length,
      });
    });
  });
});

// delete
router.delete("/types/:id", (req, res, cb) => {
  let id = req.params.id;
  let sql = `DELETE FROM type WHERE id=${id}`;
  let body = req && req.body;

  connection.query(sql, function (err, rows, cb) {
    if (err) throw err;
    res.send({
      data: body,
    });
  });
});

// post
router.post("/types", (req, res, cb) => {
  let body = req && req.body;
  let sql = `INSERT INTO type (name) VALUES ('${body.name}');`;
  connection.query(sql, function (err, rows, cb) {
    if (err) throw err;
    res.send({
      data: body,
    });
  });
});

// get by id
router.get("/types/:id", (req, res, cb) => {
  let id = req.params.id;
  let sql = `SELECT * FROM type WHERE id=${id}`;
  connection.query(sql, function (err, rows, cb) {
    if (err) throw err;
    res.send({
      data: rows,
    });
  });
});
// update
router.put("/types/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let body = req && req.body;
  let sql = `UPDATE type SET name ='${body.name}',date='${new Date()}' WHERE id ='${id}'`;
 connection.query(sql, function (err, rows, cb) {
    if (err) throw err;
    res.send({
      data: rows,
    });
  });
});

module.exports = router;
