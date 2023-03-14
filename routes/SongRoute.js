
const express = require('express');
const router = express.Router();
const songController = require('../controllers/SongController');

router.get('/songs', songController.getAllSongs);
router.post('/addsong', songController.createSong);
router.get('/song/:id', songController.getSongById, (req, res) => {
  res.json(res.song);
});
router.patch('/editsong/:id', songController.getSongById, songController.updateSong);
router.delete('/deletesong/:id', songController.getSongById, songController.deleteSong);
router.get('/status', songController.status);

module.exports = router;
