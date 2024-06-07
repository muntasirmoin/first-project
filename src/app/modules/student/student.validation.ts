import { z } from 'zod'
import validator from 'validator'

// Define Zod schemas for each part of the student schema

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20 characters')
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
      },
      {
        message: 'First name must be in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => validator.isAlpha(value), {
    message: 'Last name is not valid',
  }),
})

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name required'),
  fatherOccupation: z.string().nonempty('Father occupation required'),
  fatherContactNumber: z.string().nonempty('Father contact number required'),
  motherName: z.string().nonempty('Mother name required'),
  motherOccupation: z.string().nonempty('Mother occupation required'),
  motherContactNumber: z.string().nonempty('Mother contact number required'),
})

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name required'),
  occupation: z.string().nonempty('Local guardian occupation required'),
  contactNo: z.string().nonempty('Local guardian contact number required'),
  address: z.string().nonempty('Local guardian address required'),
})

const createStudentValidationSchema = z.object({
  body: z.object({
    // id: z.string().nonempty('ID required'),
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .nonempty('Email required')
        .email('Not a valid email type'),
      contactNo: z.string().nonempty('Contact number required'),
      emergencyContact: z.string().nonempty('Emergency contact required'),
      BloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().nonempty('Present address required'),
      permanentAddress: z.string().nonempty('Permanent address required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),

      admissionSemester: z.string(),

      // isActive: z.enum(['Active', 'Block']).default('Active'),
      // isDeleted: z.boolean(),
    }),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
})

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
})

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
