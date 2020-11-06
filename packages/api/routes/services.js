var connection = require("./connection/connection");
var express = require("express");
var multer = require("multer");
var fs = require("fs");
var cors = require("cors");

const app = express();
app.use(cors());
app.use("/uploads", express.static(process.cwd() + "/uploads"));
let limit = 5;
let offset = 0;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", (req, res, cb) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res
      .status(200)
      .send({ data: req.file, message: "Image Uploaded Successfully" });
  });
});

app.post("/service", function (req, res, cb) {
  let data = req.body;

  let sql = `INSERT INTO service (title,price,category,type, image) VALUES ("${data.title}","${data.price}", "${data.category}","${data.type}", "${data.imagename}" )`;

  connection.query(sql, function (err, rows, fields) {
    if (err) {
      res.send({ data: err.sqlMessage });
      throw err;
    } else {
      res.send({ data: rows, message: "Data added Successfully" });
    }
  });
});

/* GET users listing. */
app.get("/service", function (req, res, next) {
  let total_sql = `SELECT * FROM service`;
  let sql = `SELECT * from service ORDER BY id DESC LIMIT ${
    req.query.limit ? req.query.limit : limit
  } OFFSET ${req.query.page ? req.query.page : offset}`;
  let search_sql = `SELECT * FROM service WHERE title LIKE '%${req.query.search}%' OR price LIKE '%${req.query.search}%'`;

  connection.query(total_sql, function (error, data, fieldslist) {
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

app.get("/service/:id", (req, res, next) => {
  let id = req && req.params && req.params.id;

  let sql = `SELECT * FROM service WHERE id =${id}`;
  connection.query(sql, function (err, rows, fields) {
    res.send({
      data: rows[0],
      validUntil: new Date(),
    });
  });
});

app.put("/service/:id", (req, res, cb) => {
  let body = req && req.body;
  let sql = `UPDATE service SET title='${body.title}',price='${body.price}',category='${body.category}',type='${body.type}',image='${body.image.path}' WHERE id='${req.params.id}'`;
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      res.send({
        data: err.sqlMessage,
      });
      throw err;
    } else {
      res.send({
        data: rows
      });
    }
  });
});

// delete
app.delete("/service/:id", (req, res, cb) => {
  let id = req && req.params.id;
  let body = req && req.body;

  let sql = `DELETE FROM service WHERE id=${id}`;
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      res.send({
        data: err.sqlMessage,
        message: err.sqlMessage,
      });
      throw err;
    } else {
      res.send({
        data: body,
        message: "item deleted Successfully",
      });
    }
  });
});

module.exports = app;
