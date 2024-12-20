"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
// Load environment variables
dotenv_1.default.config();
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Middlewares
const authMiddleware_1 = require("./middlewares/authMiddleware");
// Initialize Express App
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(authMiddleware_1.authMiddleware);
// MongoDB Connection
(async function () {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URL || "");
        console.log("Connected to MongoDB...");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error Connecting to MongoDB:", error.message);
        }
        process.exit(1);
    }
})();
// Define Routes
app.use("/api/auth", authRoutes_1.default);
app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*").send("Storm's Server🔥 ");
});
// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(` Storm's Server's 🏃🚀.. ${PORT}`));
exports.default = app;
