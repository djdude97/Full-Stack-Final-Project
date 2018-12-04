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
});

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

 app.post("/deal", function(req, res) {
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

app.get("/create", function(req, res) {
    res.render("create");
});

app.delete("/deal/:id", function(req, res) {
    // Find deal by id
    Deal.findByIdAndRemove(req.body.id, function(err, deal){
        if (err) throw err;
        if (!deal) return res.send("No deal by that ID found");

        return res.send("Deal " + req.body.id + " was deleted!");
    });
});

app.get("/deal", function(req, res) {
    // Get all deals
    Deal.find({}, function(err, deals){
        if (err) throw err;
        res.send(deals);
    });
});

app.get("/search/location", function(req, res) {
    // Get all deals with a certain location
    Deal.find({}, function(err, deals){
        if (err) throw err;
        res.send(deals);
    });
});

app.get("/", function(req, res) {
  Deal.find({}, function(err, deals){
      if (err) throw err;
      DEALS = deals;
  });
    res.render("home", {deals: DEALS});
});

app.listen(PORT, function() {
    console.log("Drew's Final Project is listening on port:" + PORT);
});
