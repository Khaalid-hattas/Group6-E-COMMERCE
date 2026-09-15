const express = require('express');

const router = express.Router();

const {
    getArtwork,
    getArtworkItem,
    createArtwork,
    updateArtwork,
    deleteArtwork
} = require('../controllers/artworkController');

router.get('/', getArtwork);

router.get('/:id', getArtworkItem);

router.post('/', createArtwork);

router.put('/:id', updateArtwork);

router.delete('/:id', deleteArtwork);

module.exports = router;