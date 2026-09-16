import express from 'express';

const router = express.Router();

import {
    getHandmade,
    getHandmadeItem,
    createHandmade,
    updateHandmade,
    deleteHandmade
} from '../controllers/handmadeController.js';

router.get('/', getHandmade);

router.get('/:id', getHandmadeItem);

router.post('/', createHandmade);

router.put('/:id', updateHandmade);

router.delete('/:id', deleteHandmade);

export default router;
