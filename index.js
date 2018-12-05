var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var path = require("path")
var Deal = require("./models/Deal");
var PORT = process.env.PORT || 5000

//database shenanigans
dotenv.load();
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

var DEALS;
//all entries in the database
Deal.find({}, function(err, deals){
    if (err) throw err;
    DEALS = deals;
}).sort({$natural: -1});

//starting up express app
var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set("view engine", "handlebars");
app.use("/public", express.static("public"));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have "/api" prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 app.post("/api/deal", function(req, res) {
    // Create new deal
    var deal = new Deal({
        name: req.body.name,
        price: parseInt(req.body.price),
        location: req.body.location,
        items: req.body.items,
        starts: req.body.starts,
        ends: req.body.ends,
        catch: req.body.catch
    });
    // Save deal to database
    deal.save(function(err){
        if (err) throw err;
    });
    res.render("post", {name: deal.name, location: deal.location});
});

app.get("/api/create", function(req, res) {
    res.render("create");
});

app.get("/api/deal", function(req, res) {
    // Get all deals
    Deal.find({}, function(err, deals){
        if (err) throw err;
        res.send(deals);
    });
});

app.post("/api/search/name", function(req, res) {
    var name = req.body.name;
    Deal.find({name: name}, function(err, deals) {
        if (err) throw err;
        res.render("search", {deals: deals, name: name});
    }).sort({$natural: -1});
});

app.post("/api/search/location", function(req, res) {
    var location = req.body.location;
    Deal.find({location: location}, function(err, deals) {
        if (err) throw err;
        res.render("search", {deals: deals, location: location});
      }).sort({$natural: -1});
});

app.post("/api/search/starts", function(req, res) {
    var starts = req.body.starts;
    Deal.find({starts: starts}, function(err, deals) {
        if (err) throw err;
        res.render("search", {deals: deals, starts: starts});
      }).sort({$natural: -1});
});

app.post("/api/search/price", function(req, res) {
    var price = req.body.price;
    Deal.find({price: price}, function(err, deals) {
        if (err) throw err;
        res.render("search", {deals: deals, price: price});
    }).sort({$natural: -1});
});

app.get("/api/free", function(req, res) {
    Deal.find({price: 0}, function(err, deals) {
        if (err) throw err;
        res.render("free", {deals: deals});
    }).sort({$natural: -1});
});

app.get("/api/nocatch", function(req, res) {
    Deal.find({catch: ""}, function(err, deals) {
        if (err) throw err;
        res.render("nocatch", {deals: deals});
    }).sort({$natural: -1});
});

app.get("/api/alwaysfree", function(req, res) {
    Deal.find({ends: ""}, function(err, deals) {
        if (err) throw err;
        res.render("alwaysfree", {deals: deals});
    }).sort({$natural: -1});
});

app.get("/api/day", function(req, res) {
    Deal.find({$where: "this.starts == this.ends"}, function(err, deals) {
        if (err) throw err;
        res.render("day", {deals: deals});
    }).sort({$natural: -1});
});

app.get("/api", function(req, res) {
  Deal.find({}, function(err, deals){
      if (err) throw err;
      DEALS = deals;
  }).sort({$natural: -1});
  res.render("home", {deals: DEALS});
});

app.get("/", function(req, res) {
  Deal.find({}, function(err, deals){
      if (err) throw err;
      DEALS = deals;
  }).sort({$natural: -1});
  res.render("home", {deals: DEALS});
});

app.get("/api/dl", function(req, res) {
  Deal.find({}, function(err, deals){
      if (err) throw err;
      DEALS = deals;
  }).sort({$natural: -1});
  res.json(JSON.stringify(DEALS));
});

app.listen(PORT, function() {
    console.log("Drew's Final Project is listening on port:" + PORT);
});
