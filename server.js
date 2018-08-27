// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
// const cheerio = require("cheerio");
// const request = require("request");
// const axios = require("axios");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
// Set our public folder as our static directory
app.use(express.static("public"));

// Set yp an Express Router
const router = express.Router();
// have every request go though through our router middleware
app.use(router);

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// require models
const db = require("./models");
// if deployed, use the deployed database. otherwire use the local mongo database
const usedDB = process.env.MONGODB_URI || "mongodb://localhost/roomrave";

// Connect mongoose to our database
//  I can use a promise here. next updated.
mongoose.connect(usedDB, {
  useNewUrlParser: true
}, function (error, db) {
  // log any errors
  if (error) throw (`There is a connection error of: ${error}`);
  // show a success message if connected
  // console.log("db in server is ", db);
  console.log(`Mongoose connection to ${usedDB}`);
  db.close();
});
// Routes + Handlebars
// =============================================================
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Routes
// require the router files and pass the router object
require("./config/routes")(router);


//
// Routes
// app.get('/', scrap);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;