import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "../routes/auth.route.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

// Logger
app.use(morgan("dev"));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/v1/auth", authRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
