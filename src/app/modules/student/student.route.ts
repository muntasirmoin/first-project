import express from 'express'
import { StudentControllers } from './student.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { studentValidations } from './student.validation'

const router = express.Router()

// will call controller function
// router.post('/create-student', StudentControllers.createStudent)

router.get('/', StudentControllers.getAllStudents)

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
)

router.get('/:id', StudentControllers.getSingleStudent)

router.delete('/:id', StudentControllers.deleteStudent)

export const StudentRoutes = router
