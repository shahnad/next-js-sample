var express = require("express");
var connection = require("./connection/connection");
var router = express();
let limit = "";
let offset = "";

// get
router.get("/types", function (req, res, next) {
  let sqltotal = `SELECT * from type `;
  let sql = `SELECT * from type ORDER BY id DESC ${
    req.query.limit ? "LIMIT " + req.query.limit : limit
  } ${req.query.page ? "OFFSET " + req.query.page : offset}`;
  let search_sql = `SELECT * FROM type WHERE name LIKE '%${req.query.search}%'  ${
    req.query.limit ? "LIMIT " + req.query.limit : limit
  } ${req.query.page ? "OFFSET " + req.query.page : offset}`;

  console.log(req.query.search, "req.query.search");
  connection.query(sqltotal, function (error, data, cb) {
    connection.query(req.query.search ? search_sql : sql, function (
      err,
      rows,
      fields
    ) {
      if (err) {
        res.send({ data: err.sqlMessage });
        throw err;
      } else {
        res.send({
          data: rows,
          total: data.length,
        });
      }
    });
  });
});

// delete
router.delete("/types/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let sql = `DELETE FROM type WHERE id=${id}`;
  let body = req && req.body;

  connection.query(sql, function (err, rows, cb) {
    if (err) {
      res.send({ data: err.sqlMessage });
      throw err;
    } else {
      res.send({
        data: body,
        message: "Type Deleted Successfully",
      });
    }
  });
});

// post
router.post("/types", (req, res, cb) => {
  let body = req && req.body;
  let sql = `INSERT INTO type (name) VALUES ('${body.name}');`;
  connection.query(sql, function (err, rows, cb) {
    if (err) {
      res.send({ data: err.sqlMessage });
      throw err;
    } else {
      res.send({
        data: body,
        message: "Type Added Successfully",
      });
    }
  });
});

// get by id
router.get("/types/:id", (req, res, cb) => {
  let id = req && req.params && req.params.id && req.params.id;
  let sql = `SELECT * FROM type WHERE id=${id}`;

  connection.query(sql, function (err, rows, cb) {
    if (err) {
      res.send({ data: err.sqlMessage });
      throw err;
    } else {
      res.send({
        data: rows[0],
      });
    }
  });
});
// update
router.put("/types/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let body = req && req.body;
  let sql = `UPDATE type SET name ='${
    body.name
  }',date='${new Date()}' WHERE id ='${id}'`;
  connection.query(sql, function (err, rows, cb) {
    if (err) {
      res.send({ data: err.sqlMessage });
      throw err;
    } else {
      res.send({
        data: rows,
        message: "Type updated Successfully",
      });
    }
  });
});

module.exports = router;
