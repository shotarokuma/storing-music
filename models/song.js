const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: { type: String, minlength: 1, maxlength: 30, required: true },
});

exports.SongSchema = SongSchema;
exports.Song = mongoose.model('Song', SongSchema);