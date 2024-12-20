import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
// Routes
import authRoutes from "./routes/authRoutes";
// Middlewares
import { authMiddleware } from "./middlewares/authMiddleware";

// Initialize Express App
const app = express();
const server = http.createServer(app);

// middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
(async function () {
	try {
		await mongoose.connect(process.env.MONGODB_URL || "");
		console.log("Connected to MongoDB...");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Connecting to MongoDB:", error.message);
		}
		process.exit(1);
	}
})();

// Define Routes
// Public routes
app.get("/", (req, res) => {
  res.send("Storm's Server🔥");
});

// Protected routes
app.use("/api/auth", authMiddleware(), authRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Storm's Server's 🏃🚀.. ${PORT}`));

export default app;
