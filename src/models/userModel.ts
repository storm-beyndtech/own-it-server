import mongoose from "mongoose";
import { z } from "zod";

// Import Zod schemas
import {
	BaseUserSchema as ZodBaseUserSchema,
	PatientSchema as ZodPatientSchema,
	DoctorSchema as ZodDoctorSchema,
	LabSchema as ZodLabSchema,
} from "../validation/schemas";

// ===========================
// 1. Create TypeScript Types
// ===========================

type BaseUser = z.infer<typeof ZodBaseUserSchema>;
type Patient = z.infer<typeof ZodPatientSchema>;
type Doctor = z.infer<typeof ZodDoctorSchema>;
type Lab = z.infer<typeof ZodLabSchema>;


// ===========================
// 2. Base User Mongoose Schema
// ===========================

const addressSchema = new mongoose.Schema(
	{
		street: { type: String },
		state: { type: String },
		city: { type: String },
		postalCode: { type: String },
	},
	{ _id: false },
);

const userSchema = new mongoose.Schema<BaseUser>(
	{
		accountType: { type: String, required: true, enum: ["Patient", "Doctor", "Lab"] },
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String, required: true, unique: true },
		phone: { type: String },
		password: { type: String, required: true },
		profilePhoto: { type: String },
		disabledAccount: {
			reason: { type: String },
			isDisabled: { type: Boolean, default: false },
		},
		isCompletedProfile: { type: Boolean, default: false },
		isEmailVerified: { type: Boolean, default: false },
	},
	{ discriminatorKey: "accountType", timestamps: true },
);

// ===========================
// 3. Discriminator Schemas
// ===========================

// Patient Schema
const patientSchema = new mongoose.Schema<Patient>({
	gender: { type: String, enum: ["Male", "Female", "Other"] },
	dateOfBirth: { type: Date },
	address: addressSchema,
	isHRABooked: { type: Boolean, default: false },
	isSubscribed: { type: Boolean, default: false },
});

// Doctor Schema
const doctorSchema = new mongoose.Schema<Doctor>({
	practiceLocations: [
		{
			facilityName: { type: String },
			address: addressSchema,
			startTime: { type: String },
			position: { type: String },
			isPrimary: { type: Boolean, default: false },
		},
	],
	specialities: [{ type: String }],
	medicalLicense: { type: String },
	yearsOfExperience: { type: Number },
	identificationNumber: { type: String },
	medicalLicenseFiles: [{ type: String }],
	resume: { type: String },
	portfolioLinks: [{ type: String }],
	schedule: [
		{
			day: { type: String },
			startTime: { type: String },
			endTime: { type: String },
		},
	],
});

// Lab Schema
const labSchema = new mongoose.Schema<Lab>({
	labLocations: [
		{
			labName: { type: String },
			address: addressSchema,
			isPrimary: { type: Boolean, default: false },
		},
	],
	licenseNumber: { type: String },
	yearsOfExperience: { type: Number },
});

// ===========================
// 4. Models Creation
// ===========================

const User = mongoose.model<BaseUser>("User", userSchema);
const Patient = User.discriminator<Patient>("Patient", patientSchema);
const Doctor = User.discriminator<Doctor>("Doctor", doctorSchema);
const Lab = User.discriminator<Lab>("Lab", labSchema);

// ===========================
// 6. Export
// ===========================

export { User, Patient, Doctor, Lab };
