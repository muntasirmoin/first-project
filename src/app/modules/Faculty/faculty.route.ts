import express from 'express'

import { FacultyControllers } from '../Faculty/faculty.controller'
import { updateFacultyValidationSchema } from '../Faculty/faculty.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../student/user/user.constant'

const router = express.Router()

router.get('/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

router.delete('/:id', FacultyControllers.deleteFaculty)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
)

export const FacultyRoutes = router
