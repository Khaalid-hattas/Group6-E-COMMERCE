const express = require('express');

const router = express.Router();

const {
    getHandmade,
    getHandmadeItem,
    createHandmade,
    updateHandmade,
    deleteHandmade
} = require('../controllers/handmadeController');

router.get('/', getHandmade);

router.get('/:id', getHandmadeItem);

router.post('/', createHandmade);

router.put('/:id', updateHandmade);

router.delete('/:id', deleteHandmade);

module.exports = router;