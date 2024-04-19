import express from "express";
import cors from "cors";
import jobsRoutes from "./routes/jobs/jobsRoutes.js";
import "dotenv/config";
const app = express();

// Server

const server = 5000;

// Middlewares

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes

// ===== /api =====
app.use("/api", jobsRoutes);

// Server Init

app.listen(server, () => {
  console.log(`server running on port ${server}`);
});
