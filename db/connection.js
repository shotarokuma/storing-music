const mongoose = require("mongoose");

let mongoDB = `mongodb+srv://shotaro:fi9o7Qebg0GlpjJQ@cluster0.ujkhf.mongodb.net/a4?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useNewUrlParser: true });

module.exports = mongoose.connection;