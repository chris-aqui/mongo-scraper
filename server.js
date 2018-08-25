// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
// const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// require models
var db = require("./models");

// Routes + Handlebars
// =============================================================
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

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