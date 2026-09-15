const express = require('express');
require('dotenv').config({ path: './src/.env' });

const pool = require('./config/db');
const creatorRoutes = require('./routes/creatorRoutes');
const artworkRoutes = require('./routes/artworkRoutes');
const handcraftRoutes = require('./routes/handcraftRoutes');
const handmadeRoutes = require('./routes/handmadeRoutes');

const app = express();

app.use(express.json());



// ==============================
// CREATOR ROUTES
// ==============================
app.use('/api/creators', creatorRoutes);
app.use('/api/artwork', artworkRoutes);
app.use('/api/handcraft', handcraftRoutes);
app.use('/api/handmade', handmadeRoutes);

// ==============================
// TEST API
// ==============================
app.get('/', (req, res) => {
    res.json({
        message: 'ArtisanHub API is running'
    });
});


// ==============================
// TEST DATABASE
// ==============================
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT 1 AS result'
        );

        res.status(200).json({
            message: 'Database connected successfully',
            result: rows
        });

    } catch (error) {
        res.status(500).json({
            message: 'Database connection failed',
            error: error.message
        });
    }
});


// ==============================
// START SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});