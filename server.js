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
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// require models
const db = require("./models");
// if deployed, use the deployed database. otherwire use the local mongo database
const usedDB = process.env.MONGODB_URL || "mongodb://localhost/roomrave";

// Connect mongoose to our database
mongoose.connect(usedDB, function(error){
  // log any errors
  if (error) {
    throw error;
  } else {
    // show a success message if connected
    console.log("mongoose connection is good")

  }
});
// Routes + Handlebars
// =============================================================
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
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