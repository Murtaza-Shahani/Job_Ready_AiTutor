import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ConnectDb from './config/db.js';
import learnRoutes from './routes/learn.js';
import quizRoutes from "./routes/quiz.js";
import jobRoutes from "./routes/job.js";
import coverLetterRouts from "./routes/coverLetter.js"
import  authRoutes from "./routes/authRoutes.js"
dotenv.config();

const app = express();


//connect db
ConnectDb();

//middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://job-ready-ai-tutor.vercel.app',
      
    ];

    // Check for subdomain patterns
    const subdomainPattern = /^https?:\/\/[a-zA-Z0-9-]+\.cssawwwards\.com$/;
    const isSubdomain = subdomainPattern.test(origin);

    if (allowedOrigins.includes(origin) || isSubdomain) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cache-Control', 'Pragma']
}));

app.use(express.json());


// Register route
app.use("/api/auth", authRoutes);

app.use('/api', learnRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/cover-letter", coverLetterRouts);

app.use((err, req, res, next) => {
  console.error("🔥 Error caught by middleware:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    // Include stack only in development
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
