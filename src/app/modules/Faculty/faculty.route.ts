import express from 'express'

import { FacultyControllers } from '../Faculty/faculty.controller'
import { updateFacultyValidationSchema } from '../Faculty/faculty.validation'
import { validateRequest } from '../../middlewares/validateRequest'

const router = express.Router()

router.get('/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

router.delete('/:id', FacultyControllers.deleteFaculty)

router.get('/', FacultyControllers.getAllFaculties)

export const FacultyRoutes = router
