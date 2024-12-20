"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabSchema = exports.DoctorSchema = exports.PatientSchema = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User = mongoose_1.default.model("User", new mongoose_1.default.Schema({
    accountType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profilePhoto: { type: String },
    disabledAccount: {
        reason: { type: String },
        isDisabled: { type: Boolean, default: false },
    },
}, { discriminatorKey: "accountType", timestamps: true }));
exports.User = User;
const PatientSchema = User.discriminator("Patient", new mongoose_1.default.Schema({
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date },
    address: {
        street: { type: String },
        state: { type: String },
        city: { type: String },
        postalCode: { type: String },
    },
    isCompletedProfile: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isHRABooked: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
}));
exports.PatientSchema = PatientSchema;
const DoctorSchema = User.discriminator("Doctor", new mongoose_1.default.Schema({
    practiceLocations: [
        {
            facilityName: { type: String, required: true },
            address: {
                street: { type: String, required: true },
                state: { type: String, required: true },
                city: { type: String, required: true },
                postalCode: { type: String, required: true },
            },
            startTime: { type: String },
            position: { type: String },
            isPrimary: { type: Boolean, default: false },
        },
    ],
    specialities: [{ type: String }],
    medicalLicense: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    identificationNumber: { type: String, required: true },
    medicalLicenseFiles: [{ type: String }],
    resume: { type: String },
    portfolioLinks: [{ type: String }],
    schedule: [
        {
            day: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
        },
    ],
    isCompletedProfile: { type: Boolean, default: false },
}));
exports.DoctorSchema = DoctorSchema;
const LabSchema = User.discriminator("Lab", new mongoose_1.default.Schema({
    labLocations: [
        {
            labName: { type: String, required: true },
            address: {
                street: { type: String, required: true },
                state: { type: String, required: true },
                city: { type: String, required: true },
                postalCode: { type: String, required: true },
            },
            isPrimary: { type: Boolean, default: false },
        },
    ],
    licenseNumber: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    isCompletedProfile: { type: Boolean, default: false },
}));
exports.LabSchema = LabSchema;
