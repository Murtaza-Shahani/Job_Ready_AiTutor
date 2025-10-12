import express from "express";
import { generateCoverLetter } from "../controllers/coverLetter.js";

const router = express.Router();

router.post("/generate", generateCoverLetter);

export default router;
