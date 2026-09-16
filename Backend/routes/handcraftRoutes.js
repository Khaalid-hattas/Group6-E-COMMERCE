import express from 'express';

const router = express.Router();

import {
    getHandcraft,
    getHandcraftItem,
    createHandcraft,
    updateHandcraft,
    deleteHandcraft
} from '../controllers/handcraftController.js';

router.get('/', getHandcraft);

router.get('/:id', getHandcraftItem);

router.post('/', createHandcraft);

router.put('/:id', updateHandcraft);

router.delete('/:id', deleteHandcraft);

export default router;
