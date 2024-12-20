"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabSchema = exports.DoctorSchema = exports.PatientSchema = void 0;
const zod_1 = require("zod");
const AddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    state: zod_1.z.string(),
    city: zod_1.z.string(),
    postalCode: zod_1.z.string()
});
const BaseUserSchema = zod_1.z.object({
    accountType: zod_1.z.enum(['Patient', 'Doctor', 'Lab']),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    password: zod_1.z.string().min(8),
    profilePhoto: zod_1.z.string().optional(),
    disabledAccount: zod_1.z.object({
        reason: zod_1.z.string().optional(),
        isDisabled: zod_1.z.boolean().default(false)
    }).optional()
});
exports.PatientSchema = BaseUserSchema.extend({
    gender: zod_1.z.enum(['Male', 'Female', 'Other']).optional(),
    dateOfBirth: zod_1.z.date().optional(),
    address: AddressSchema.optional(),
    isCompletedProfile: zod_1.z.boolean().default(false),
    isEmailVerified: zod_1.z.boolean().default(false),
    isHRABooked: zod_1.z.boolean().default(false),
    isSubscribed: zod_1.z.boolean().default(false)
});
exports.DoctorSchema = BaseUserSchema.extend({
    practiceLocations: zod_1.z.array(zod_1.z.object({
        facilityName: zod_1.z.string(),
        address: AddressSchema,
        startTime: zod_1.z.string().optional(),
        position: zod_1.z.string().optional(),
        isPrimary: zod_1.z.boolean().default(false)
    })),
    specialities: zod_1.z.array(zod_1.z.string()),
    medicalLicense: zod_1.z.string(),
    yearsOfExperience: zod_1.z.number(),
    identificationNumber: zod_1.z.string(),
    medicalLicenseFiles: zod_1.z.array(zod_1.z.string()).optional(),
    resume: zod_1.z.string().optional(),
    portfolioLinks: zod_1.z.array(zod_1.z.string()).optional(),
    schedule: zod_1.z.array(zod_1.z.object({
        day: zod_1.z.string(),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string()
    })),
    isCompletedProfile: zod_1.z.boolean().default(false)
});
exports.LabSchema = BaseUserSchema.extend({
    labLocations: zod_1.z.array(zod_1.z.object({
        labName: zod_1.z.string(),
        address: AddressSchema,
        isPrimary: zod_1.z.boolean().default(false)
    })),
    licenseNumber: zod_1.z.string(),
    yearsOfExperience: zod_1.z.number(),
    isCompletedProfile: zod_1.z.boolean().default(false)
});
