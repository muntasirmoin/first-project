// import { Schema, model, connect, Model } from 'mongoose'

import { Types } from 'mongoose'
import { Model } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNumber: string
  motherName: string
  motherOccupation: string
  motherContactNumber: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  password: string
  name: TUserName
  gender: 'male' | 'female' | 'others'
  dateOfBirth?: Date
  email: string
  contactNo: string
  emergencyContact: string
  BloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  admissionSemester: Types.ObjectId
  isDeleted: boolean
  academicDepartment: Types.ObjectId
}

// for creating static

export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  IsUserExists(id: string): Promise<TStudent | null>
}

// for creating instance
// export type StudentMethods = {
//   IsUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >
