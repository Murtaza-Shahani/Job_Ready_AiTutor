import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import learnRoutes from './routes/learn.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register route
app.use('/api', learnRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
