var express = require("express");
var router = express.Router();
var connection = require("./connection/connection");
var cors = require("cors");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const { log } = require("debug");

router.use(cors());
router.use(cookieParser());
router.use(session({ secret: "Your secret key" }));

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

function checkSignIn(req, res) {
  if (req.session.user) {
    next(); //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    next(err); //Error, trying to access unauthorized page!
  }
}

router.post("/login", function (req, res) {
  let body = "";
  body = req.body;
  if (body.email === "" || body.password === "") {
    res.send({ data: req.body, message: "Email and Password Required" });
  } else {
    let sql = `SELECT * FROM users`;
    connection.query(sql, function (err, rows, fields) {
      let check = [];
      check = rows.filter((data) => {
        if (data.email === body.email && data.password === body.password) {
          return true;
        } else {
          return false;
        }
      });

      if (check.length) {
        res.send({
          data: check && check[0],
          session: req.sessionID,
          message: "Login Successfully",
        });
      } else {
        res.send({
          data: req.body,
          session: "",
          message: "Invalid credentials",
        });
      }
    });
  }
});

module.exports = router;
