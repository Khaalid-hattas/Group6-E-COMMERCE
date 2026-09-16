import express from 'express';

const router = express.Router();

import {
    getCreators,
    getCreator
} from '../controllers/creatorController.js';

router.get('/', getCreators);

router.get('/:id', getCreator);

export default router;
