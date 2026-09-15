import express from 'express';
import cors from 'cors';
import registerRoutes from './routes/registerRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', registerRoutes);
app.use('/api', loginRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'ArtisanHub API is running'
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});