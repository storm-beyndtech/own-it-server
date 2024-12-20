"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userMd_1 = require("../models/userMd");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const register = async (req, res) => {
    try {
        const { contact, password, ...userData } = req.body;
        const existingUser = await userMd_1.User.findOne({ "contact.email": contact.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new userMd_1.User({
            ...userData,
            contact,
            password: hashedPassword,
        });
        await user.save();
        const token = (0, authMiddleware_1.generateToken)(user._id.toString(), user.accountType);
        res.status(201).json({
            message: "User registered successfully",
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Registration failed", error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userMd_1.User.findOne({ "contact.email": email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = (0, authMiddleware_1.generateToken)(user._id.toString(), user.accountType);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
};
exports.login = login;
