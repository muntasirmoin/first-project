import express from 'express'
// import validateRequest from '../../middlewares/validateRequest';
// import { createAdminValidationSchema } from '../Admin/admin.validation';
// import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
// import { createStudentValidationSchema } from './../student/student.validation';
import { UserControllers } from './user.controller'
import { validateRequest } from '../../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../../Faculty/faculty.validation'
import { studentValidations } from '../student.validation'
import { AdminValidations } from '../../Admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
)

export const UserRoutes = router
