// routes/quiz.js

import express from "express";
import { generateQuiz } from "../controllers/quiz.js";

const router = express.Router();

router.post("/generate", generateQuiz);

export default router;
