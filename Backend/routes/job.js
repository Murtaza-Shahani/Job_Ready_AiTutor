// routes/job.js
import express from "express";
import { fetchJobListings } from "../controllers/job.js";

const router = express.Router();

router.post("/generate", fetchJobListings);

export default router;
