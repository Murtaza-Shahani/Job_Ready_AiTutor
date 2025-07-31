import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import learnRoutes from './routes/learn.js';
import quizRoutes from "./routes/quiz.js";
import jobRoutes from "./routes/job.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register route
app.use('/api', learnRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/jobs", jobRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
