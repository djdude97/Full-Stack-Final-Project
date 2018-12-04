var mongoose = require('mongoose');

var dealSchema = new mongoose.Schema({
    name: String,
    price: Number,
    location: String,
    items: [String],
    starts: String,
    ends:  String,
    catch: String
});

var Deal = mongoose.model("Deal", dealSchema);

module.exports = Deal;
