// controllers/songs.js

const Song = require('../models/song');

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSongById = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song == null) {
      return res.status(404).json({ message: 'Cannot find song' });
    }
    res.song = song;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createSong = async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
  });
  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSong = async (req, res) => {
  if (req.body.title != null) {
    res.song.title = req.body.title;
  }
  if (req.body.artist != null) {
    res.song.artist = req.body.artist;
  }
  if (req.body.album != null) {
    res.song.album = req.body.album;
  }
  if (req.body.genre != null) {
    res.song.genre = req.body.genre;
  }
  try {
    const updatedSong = await res.song.save();
    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    await res.song.findOneAndDelete();
    res.json({ message: 'Song deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.status= async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').countDocuments();
    const totalAlbums = await Song.distinct('album').countDocuments();
    const totalGenres = await Song.distinct('genre').countDocuments();
    const songsByGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);
    const songsByArtist = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 }, albums: { $addToSet: '$album' } } },
    ]);
    const songsByAlbum = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
    ]);
    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsByGenre,
      songsByArtist,
      songsByAlbum,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};