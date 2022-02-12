const express = require("express");
const app = express();

const db = require("./db/connection.js");

db.once('open', () => {
  console.log("connected to database");
  const server = app.listen(8080, () => console.log("listening"));
})
  .on('error', function (err) {
    console.log(err);
  });


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const { Band } = require('./models/band.js');
const { Album } = require('./models/album.js');
const { Song } = require('./models/song.js');

app.post('/bands', (req, res) => {
  let band = new Band(req.body);
  band.save(error => {
    if (error) res.status(500).json(error);
    res.status(201).json(band);
  });
});

app.post('/albums', (req, res) => {
  Band.findOne({ "name": req.body.band }).exec((error, band) => {
    if (error || !band) {
      res.status(500).send("No band with that name found!");
    } else {
      let album = new Album(req.body);
      album.save(error => {
        if (error) res.status(500).json(error);
        band.albums.push(album._id);
        band.save(error => {
          if (error) res.status(500).json(error);
          res.status(201).json(album);
        });
      });
    }
  });
});

app.post('/songs', (req, res) => {
  Album.findOne({ "name": req.body.album }).exec((error, album) => {
    if (error || !album) {
      res.send("No album with that name found!");
    } else {
      let song = new Song(req.body);
      album.songs.push(song);
      album.save(error => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(201).json(song);
        }
      });
    }
  });
});

app.get('/albums', (req, res) => {
  Album.find({}).exec((error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(result);
    }
  })
});

app.get('/bands', (req,res) => {
  Band.find({})
    .populate('albums')
    .exec(
      (error, result) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.json(result);
        }
      }
    );
});
