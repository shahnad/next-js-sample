var connection = require("./connection/connection");
var express = require("express");
var multer = require("multer");
var fs = require('fs');

const app = express();

let order = "";
let param = "";
let offset = "1";
let limit = "9";
let search = "";
let category = "";
let type = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("image");

app.post("/upload", (req, res, cb) => {
  let data = req.body;


  console.log("eee",req);


 

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.body);
  });


});

app.post("/service", function (req, res, cb) {
  let data = req.body;

  let sql = `INSERT INTO service (title,price,category,type, image) VALUES ("${data.title}","${data.price}", "${data.category}","${data.type}", "${data.image.title}" )`;

  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.send({ data: rows });
  });


});

/* GET users listing. */
app.get("/service", function (req, res, next) {
  if (req.query && req.query.range) {
    offset = req.query.range[0];
    limit = req.query.range[1];
  }
  if (req.query && req.query.pageno) {
    offset = req.query.pageno;
  }

  param = req.query.sort[0];
  order = req.query.sort[1];
  let filter = JSON.parse(req.query.filter);
  if (req.query && req.query.category) {
    category = req.query.category;
  }
  if (req.query && req.query.type) {
    type = req.query.type;
  }

  if (filter && filter.q) {
    search = filter.q;
  } else {
    search = "";
  }

  let total_sql = `SELECT * FROM service`;
  let sql = `SELECT * FROM service WHERE title like '%${search}%' ${
    category != 0 ? `AND category = ${category}` : ""
  } ${
    type != 0 ? `AND type = ${type}` : ""
  } order by ${param} ${order} limit ${limit} offset ${offset}`;

  connection.query(total_sql, function (error, data, fieldslist) {
    connection.query(sql, function (err, rows, fields) {
      if (err) throw err;
      res.send({
        data: rows,
        total: data.length,
      });
    });
  });
});

app.get("/service/:id", (req, res, next) => {
  let id = req.params && req.params.id;

  let sql = `SELECT * FROM service WHERE id =${id}`;
  connection.query(sql, function (err, rows, fields) {
    res.send({
      data: rows,
      validUntil: new Date(),
    });
  });
});

app.put("/service/:id", (req, res, cb) => {
  let body = req && req.body;

  let sql = `UPDATE service SET title='${body.title}',price='${body.price}',category='${body.category}',type='${body.type}',image='${body.image.path}' WHERE id='${req.params.id}'`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows, "body");
    res.send({
      data: rows,
    });
  });
});
app.delete("/service/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let body = req && req.body;
  console.log(body, "aa", id);
  let sql = `DELETE FROM service WHERE id=${id}`;
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.send({
      data: body,
    });
  });
});

module.exports = app;
