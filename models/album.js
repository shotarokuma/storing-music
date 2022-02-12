const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const {SongSchema} = require('./song.js')

const AlbumSchema = new Schema({
  name:{type:String,maxlength:30,required:true},
  genre:{type:String,maxlength:30},
  songs: [SongSchema]
});

exports.Album = mongoose.model('Album',AlbumSchema);