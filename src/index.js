const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    urlencoded: true,
  })
);

mongoose.connect("mongodb://localhost:27017/login");
var db = mongoose.connection;
db.on("error", () => {
  console.log("An error occured");
});
db.once("open", () => {
  console.log("successfully connected to database");
});
app.post("/registration", (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let contact = req.body.contact;
  let data = {
    name: name,
    contact: contact,
    email: email,
  };
  db.collection("userIn").insertOne(data, (error, collection) => {
    if (error) {
      throw error;
    } else {
      console.log("response saved successfully");
    }
  });
});

app.get("/", (req, res) => {
  res.set({
    "Allow-Access-Allow-Origin": "*",
  });
  res.redirect("index.html");
});

app.listen(3000, (error) => {
  if (!error) {
    console.log("All good");
  } else {
    console.log(error);
  }
});
