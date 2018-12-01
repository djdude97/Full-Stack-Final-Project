var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var dotenv = require('dotenv');

var app = express();

dotenv.load();
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/public", express.static("public"));

var dealSchema = new mongoose.Schema({
    store: {
        type: String,
        required: true
    },
    starts: {
        type: String,
        required: true
    },
    ends: {
        type: String,
        required: true
    },
    catch: {
        type: String,
        required: true
    },
    items: [String]
});

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have "/api" prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 app.post("/deal", function(req, res) {
    // Create new deal
    var deal = new Deal({
        store: req.body.store,
        starts: req.body.starts,
        ends: req.body.ends,
        catch: req.body.catch,
        items: req.body.items
    });

    // Save deal to database
    deal.save(function(err){
        if (err) throw err;
        return res.send("Successfully inserted deal :)");
    });
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

app.get("/", function(req, res) {
    res.send('Hello Drew!');
})

app.listen(3000, function() {
    console.log("Drew's Final Project is listening on port 3000!:");
});
