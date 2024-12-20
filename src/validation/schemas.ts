import { z } from 'zod';

const AddressSchema = z.object({
  street: z.string(),
  state: z.string(),
  city: z.string(),
  postalCode: z.string()
});

export const BaseUserSchema = z.object({
  accountType: z.enum(['Patient', 'Doctor', 'Lab']),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  profilePhoto: z.string().optional(),
  disabledAccount: z.object({
    reason: z.string().optional(),
    isDisabled: z.boolean().default(false)
  }).optional(),
  isCompletedProfile: z.boolean().default(false),
  isEmailVerified: z.boolean().default(false),
});

export const PatientSchema = BaseUserSchema.extend({
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  dateOfBirth: z.date().optional(),
  address: AddressSchema.optional(),
  isHRABooked: z.boolean().default(false),
  isSubscribed: z.boolean().default(false)
});

export const DoctorSchema = BaseUserSchema.extend({
  practiceLocations: z.array(z.object({
    facilityName: z.string(),
    address: AddressSchema,
    startTime: z.string().optional(),
    position: z.string().optional(),
    isPrimary: z.boolean().default(false)
  })),
  specialities: z.array(z.string()),
  medicalLicense: z.string(),
  yearsOfExperience: z.number(),
  identificationNumber: z.string(),
  medicalLicenseFiles: z.array(z.string()).optional(),
  resume: z.string().optional(),
  portfolioLinks: z.array(z.string()).optional(),
  schedule: z.array(z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string()
  })).optional()
});

export const LabSchema = BaseUserSchema.extend({
  labLocations: z.array(z.object({
    labName: z.string(),
    address: AddressSchema,
    isPrimary: z.boolean().default(false)
  })),
  licenseNumber: z.string(),
  yearsOfExperience: z.number(),
});