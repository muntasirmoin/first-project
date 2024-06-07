// import { TStudent } from './student.interface'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import AppError from '../../errors/AppError'
import { User } from './user/user.model'
import httpStatus from 'http-status'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentsSearchableFields } from './student.const'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query } //copy of queryObj
  // const studentsSearchableFields = ['email', 'name.firstName', 'presentAddress']
  // let searchTerm = ''
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }
  // const searchQuery = Student.find({
  //   $or: studentsSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })
  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludeFields.forEach((el) => delete queryObj[el])
  // console.log({ query }, { queryObj })
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   })
  // let sort = '-createdAt'
  // if (query.sort) {
  //   sort = query.sort as string
  // }
  // const sortQuery = filterQuery.sort(sort)
  // let page = 1
  // let limit = 1
  // let skip = 0
  // if (query.limit) {
  //   limit = Number(query.limit)
  // }
  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }
  // const paginateQuery = sortQuery.skip(skip)
  // const limitQuery = paginateQuery.limit(limit)
  // // filed limiting
  // let fields = '-__v'
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  // }
  // const fieldQuery = await limitQuery.select(fields)
  // return fieldQuery

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery

  return result
}

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id })
  // aggregate
  const result = await Student.findById({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

//
const updateStudentIntoDB = async (id: string, payLoad: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  })

  return result
}

//

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const userId = deletedStudent.user
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }
}

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
}
