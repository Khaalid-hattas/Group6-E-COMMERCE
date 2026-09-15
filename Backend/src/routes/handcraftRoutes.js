const express = require('express');

const router = express.Router();

const {
    getHandcraft,
    getHandcraftItem,
    createHandcraft,
    updateHandcraft,
    deleteHandcraft
} = require('../controllers/handcraftController');

router.get('/', getHandcraft);

router.get('/:id', getHandcraftItem);

router.post('/', createHandcraft);

router.put('/:id', updateHandcraft);

router.delete('/:id', deleteHandcraft);

module.exports = router;