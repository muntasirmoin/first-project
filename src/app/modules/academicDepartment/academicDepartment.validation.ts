import { z } from 'zod'

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department name must be string',
      required_error: 'name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error:
        'Academic department (faculty name) name must be string',
      required_error: 'faculty is required in academic department',
    }),
  }),
})

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department name must be string',
        required_error: 'name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error:
          'Academic department (faculty name) name must be string',
        required_error: 'faculty is required in academic department',
      })
      .optional(),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
}
