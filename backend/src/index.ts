import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import { initializeFirebase } from "./config/firebase";
import notesRoutes from "./routes/notes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
initializeFirebase();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/notes", notesRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Lead Notes API is running" });
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
