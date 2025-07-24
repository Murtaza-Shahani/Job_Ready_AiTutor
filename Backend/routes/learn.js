import express from 'express';
import { generateLearningContent } from '../controllers/learnController.js';

const router = express.Router();

// POST /api/learn
router.post('/learn', generateLearningContent);

export default router;
