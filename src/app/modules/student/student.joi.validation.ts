import Joi from 'joi'

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .required()
    .messages({
      'string.base': 'First name should be a type of text',
      'string.empty': 'First name required',
      'string.max': 'First name can not be more than 20 characters',
      'string.pattern.base': '{#value} is not in capitalize format',
      'any.required': 'First name required',
    }),
  middleName: Joi.string().trim().optional().allow(''),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/, 'alpha')
    .required()
    .messages({
      'string.base': 'Last name should be a type of text',
      'string.empty': 'Last name required',
      'string.pattern.base': '{#value} is not valid',
      'any.required': 'Last name required',
    }),
})

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father name should be a type of text',
    'string.empty': 'Father name required',
    'any.required': 'Father name required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father occupation should be a type of text',
    'string.empty': 'Father occupation required',
    'any.required': 'Father occupation required',
  }),
  fatherContactNumber: Joi.string().required().messages({
    'string.base': 'Father contact number should be a type of text',
    'string.empty': 'Father contact number required',
    'any.required': 'Father contact number required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother name should be a type of text',
    'string.empty': 'Mother name required',
    'any.required': 'Mother name required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother occupation should be a type of text',
    'string.empty': 'Mother occupation required',
    'any.required': 'Mother occupation required',
  }),
  motherContactNumber: Joi.string().required().messages({
    'string.base': 'Mother contact number should be a type of text',
    'string.empty': 'Mother contact number required',
    'any.required': 'Mother contact number required',
  }),
})

// LocalGuardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local guardian name should be a type of text',
    'string.empty': 'Local guardian name required',
    'any.required': 'Local guardian name required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local guardian occupation should be a type of text',
    'string.empty': 'Local guardian occupation required',
    'any.required': 'Local guardian occupation required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local guardian contact number should be a type of text',
    'string.empty': 'Local guardian contact number required',
    'any.required': 'Local guardian contact number required',
  }),
})

// Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID should be a type of text',
    'string.empty': 'ID required',
    'any.required': 'ID required',
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Name should be a type of object',
    'any.required': 'Name required',
  }),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'string.base': 'Gender should be a type of text',
    'any.only': 'The gender {#value} is not valid',
    'any.required': 'Gender required',
  }),
  dateOfBirth: Joi.string().optional().allow(''),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a type of text',
    'string.email': '{#value} is not a valid email',
    'string.empty': 'Email required',
    'any.required': 'Email required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact number should be a type of text',
    'string.empty': 'Contact number required',
    'any.required': 'Contact number required',
  }),
  emergencyContact: Joi.string().required().messages({
    'string.base': 'Emergency contact should be a type of text',
    'string.empty': 'Emergency contact required',
    'any.required': 'Emergency contact required',
  }),
  BloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'string.base': 'Blood group should be a type of text',
      'any.only': 'The blood group {#value} is not valid',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address should be a type of text',
    'string.empty': 'Present address required',
    'any.required': 'Present address required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address should be a type of text',
    'string.empty': 'Permanent address required',
    'any.required': 'Permanent address required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information should be a type of object',
    'any.required': 'Guardian information required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian information should be a type of object',
    'any.required': 'Local guardian information required',
  }),
  profileImg: Joi.string().optional().allow(''),
  isActive: Joi.string().valid('Active', 'Block').default('Active').messages({
    'string.base': 'Status should be a type of text',
    'any.only': 'Status can be either active or block',
  }),
})

export default studentValidationSchema
// export const studentValidations = {
//   studentValidationSchema
// }

//
