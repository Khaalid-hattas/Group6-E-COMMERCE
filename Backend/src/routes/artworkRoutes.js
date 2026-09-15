import express from 'express';

const router = express.Router();

import {
    getArtwork,
    getArtworkItem,
    createArtwork,
    updateArtwork,
    deleteArtwork
} from '../controllers/artworkController.js';

router.get('/', getArtwork);

router.get('/:id', getArtworkItem);

router.post('/', createArtwork);

router.put('/:id', updateArtwork);

router.delete('/:id', deleteArtwork);

export default router;
