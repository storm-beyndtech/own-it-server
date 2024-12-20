"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const TokenPayload = zod_1.z.object({
    _id: zod_1.z.string(),
    accountType: zod_1.z.enum(["Patient", "Doctor", "Lab"]),
});
// interface CustomRequest extends Request {
// 	user?: {
// 		_id: string;
// 		accountType: "Patient" | "Doctor" | "Lab";
// 	};
// }
const authMiddleware = (allowedTypes) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
            const validatedPayload = TokenPayload.parse(decoded);
            if (allowedTypes && !allowedTypes.includes(validatedPayload.accountType)) {
                return res.status(403).json({ message: "Insufficient permissions" });
            }
            req.user = validatedPayload;
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};
exports.authMiddleware = authMiddleware;
const generateToken = (_id, accountType) => {
    return jsonwebtoken_1.default.sign({ _id, accountType }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
};
exports.generateToken = generateToken;
