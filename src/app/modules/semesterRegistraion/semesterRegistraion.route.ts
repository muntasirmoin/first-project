import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { SemesterRegistrationValidations } from './semesterRegistraion.validation'
import { semesterRegistrationController } from './semesterRegistraion.controller'
const router = express.Router()

// create
router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
)

// getAll
router.get('/', semesterRegistrationController.getAllSemesterRegistrations)
// get
router.get('/:id', semesterRegistrationController.getSingleSemesterRegistration)

// update

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
)

export const semesterRegistrationRoutes = router
