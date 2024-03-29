const express = require("express");
const mysql= require("mysql");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const { render } = require("express/lib/response");

const db = mysql.createConnection({
  host: process.env.Host_db,
  user: process.env.User_db,
  password: process.env.Password_db,
  database: process.env.Database
});



exports.register = (req, res) => {
  const { fullname, email, phone, password, cpassword } = req.body;

  db.query("SELECT email_b FROM buyer WHERE email_b = ?", [email],async (err, result) => {
    if (err) {
      console.log("this the error ", err);
    } else if (result.length > 0) {
      return res.render("signin", {
        message: "Your email id already exists"
      });
    } else if (password !== cpassword) {
      return res.render("signin", {
        message: "Your password does not match. Please enter the password again"
      });
    } else {


      //let passwordhash=await bcrypt.hash(password,8);
     // console.log(passwordhash);
     // this my commit for create pull request
      db.query("INSERT INTO buyer (username, password, phone_no, email_b, id_A) VALUES (?, ?, ?, ?, ?)", [fullname,password, phone, email, "2023"], (err, result) => {
        if (err) {
          console.log("this the error ", err);
        } else {
          console.log("Insertion was successful");
          return res.render("home", {
            message: "You have been successfully registered"
          });
        }
      });
    }
  });
};


exports.login = (req, res) => {
  const { email, password} = req.body;

  db.query("SELECT * FROM buyer WHERE email_b = ?", [email], async (err, result) => {
    if (err) {
      console.log("this the error ", err);
    } else if (result.length > 0) {
      console.log(result);

      //await bcrypt.compare(password, result[0].password, (err, match) => {


        if (result[0].password===password) {
          res.render("home", { message: "you are logged in"+result[0].username });
        } else {
          res.render("login", { message: "Your password is incorrect" });
        }
      //});
    }
  });
};
