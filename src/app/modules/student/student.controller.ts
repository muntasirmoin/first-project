import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
// import { z } from 'zod'
// import { studentValidationSchema } from './student.validation'
// import Joi from 'joi'
// import studentValidationSchema from './student.validation'
// import { error } from 'console'

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Retrieved successfully',
    data: result,
  })
})
// res.status(200).json({
//   success: true,
//   message: 'Student is retrieved successfully',
//   data: result,
// })
// eslint-disable-next-line @typescript-eslint/no-explicit-any

// console.log(err)
// res.status(500).json({
//   success: false,
//   message: err.message || 'Something went wrong',
//   error: err,
// })

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StudentServices.getSingleStudentFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student is retrieved successfully',
    data: result,
  })
  // res.status(200).json({
  //   success: true,
  //   message: 'Single Student is retrieved successfully',
  //   data: result,
  // })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
})

//
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const { student } = req.body
  const result = await StudentServices.updateStudentIntoDB(id, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  })
})
//
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StudentServices.deleteStudentFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student is deleted successfully',
    data: result,
  })
})
// res.status(200).json({
//   success: true,
//   message: 'Single Student is deleted successfully',
//   data: result,
// })
// eslint-disable-next-line @typescript-eslint/no-explicit-any

// console.log(err)
// res.status(500).json({
//   success: false,
//   message: err.message || 'Something went wrong',
//   error: err,
// })

//

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent: getSingleStudent,
  deleteStudent,
  updateStudent,
}
