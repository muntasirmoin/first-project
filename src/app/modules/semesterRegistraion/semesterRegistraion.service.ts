import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TSemesterRegistration } from './semesterRegistraion.interface'
import { SemesterRegistration } from './semesterRegistraion.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './semesterRegistration.constant'

const createSemesterRegistrationIntoDB = async (
  payLoad: TSemesterRegistration,
) => {
  const academicSemester = payLoad?.academicSemester

  //   check if there any semester register that is already upcoming | ongoing

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    })

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `there is already a ${isThereAnyUpcomingOrOngoingSemester.status} semester exist`,
    )
  }

  // check the semester is exist

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester)

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester is not found',
    )
  }

  //check  semester already exist
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  })

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This academic semester is already exist',
    )
  }

  const result = await SemesterRegistration.create(payLoad)

  return result
}
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = await new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery
  return result
}
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id)

  return result
}
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payLoad: Partial<TSemesterRegistration>,
) => {
  // if the requested semester is exist

  const isSemesterRegistrationExists = await SemesterRegistration.findById(id)

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester is not found',
    )
  }

  //if the requested semester registration is ended can not update
  const currentSemesterStatus = isSemesterRegistrationExists.status
  const requestedSemesterStatus = payLoad?.status

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The  semester is already a ${currentSemesterStatus}`,
    )
  }

  //   UPCOMING --> ONGOING --> ENDED
  //   1
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedSemesterStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not directly change ${requestedSemesterStatus}To  semester status ${currentSemesterStatus}`,
    )
  }

  //   2
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedSemesterStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not directly change status ${requestedSemesterStatus} To  semester status ${currentSemesterStatus}`,
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  })

  return result
}

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
