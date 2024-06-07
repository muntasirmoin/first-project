import { Schema, model } from 'mongoose'
import validator from 'validator'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface'

// import bcrypt from 'bcrypt'
// import config from '../../config'
// import { boolean } from 'joi'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name required'],
    trim: true,
    maxlength: [20, 'first name can not be more then 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
        // console.log(value)
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name required'],
    // trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation required'],
  },
  fatherContactNumber: {
    type: String,
    required: [true, 'Father contact number required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation required'],
  },
  motherContactNumber: {
    type: String,
    required: [true, 'Mother contact number required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number required'],
  },
})

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user ID required'],
      unique: true,
      ref: 'User', // cconnection between student and user with user model 'User'
    },
    // password: {
    //   type: String,
    //   required: [true, 'password is required'],

    //   maxlength: [20, 'password can not be more then 20 character'],
    // },
    name: {
      type: userNameSchema,
      required: [true, 'Name required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: 'The gender {VALUE} is not valid',
      },
      required: [true, 'Gender required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    contactNo: { type: String, required: [true, 'Contact number required'] },
    emergencyContact: {
      type: String,
      required: [true, 'Emergency contact required'],
    },
    BloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'The blood group {VALUE} is not valid',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information required'],
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)
// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
})
// pre save middleware / hook
// studentSchema.pre('save', async function (next) {
//   // console.log(this, 'pre hook: we will save data')
//   // hashing password and save in to DB

//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   )
//   next()
// })

// // post save middleware / hook
// studentSchema.post('save', function (doc, next) {
//   doc.password = ''
//   // console.log(this, 'post hook: we save our data')
//   next()
// })

// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// // aggregate
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// creating a custom static method
studentSchema.statics.IsUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// creating a custom instance method
// studentSchema.methods.IsUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)

//
//
//
// import { Schema, model } from 'mongoose'
// import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

// const userNameSchema = new Schema<UserName>({
//   firstName: {
//     type: String,
//     required: [true, 'First name required'],
//   },
//   middleName: {
//     type: String,
//   },
//   lastName: {
//     type: String,
//     required: [true, 'LLast name required'],
//   },
// })

// const guardianSchema = new Schema<Guardian>({
//   fatherName: {
//     type: String,
//     required: true,
//   },
//   fatherOccupation: {
//     type: String,
//     required: true,
//   },
//   fatherContactNumber: {
//     type: String,
//     required: true,
//   },
//   motherName: {
//     type: String,
//     required: true,
//   },
//   motherOccupation: {
//     type: String,
//     required: true,
//   },
//   motherContactNumber: {
//     type: String,
//     required: true,
//   },
// })

// const localGuardianSchema = new Schema<LocalGuardian>({
//   name: {
//     type: String,
//     required: true,
//   },
//   occupation: {
//     type: String,
//     required: true,
//   },
//   contactNo: {
//     type: String,
//     required: true,
//   },
// })

// const studentSchema = new Schema<Student>({
//   id: { type: String, required: true, unique: true },
//   name: {
//     type: userNameSchema,
//     required: true,
//   },

//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'others'],
//       message: 'the gender {value} is not valid',
//     },
//     required: true,
//   }, //enam type
//   dateOfBirth: { type: String },
//   email: { type: String, required: true, unique: true },
//   contactNo: { type: String, required: true },
//   emergencyContact: { type: String, required: true },
//   BloodGroup: {
//     type: String,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   },
//   presentAddress: { type: String, required: true },
//   permanentAddress: { type: String, required: true },
//   guardian: {
//     type: guardianSchema,
//     required: true,
//   },

//   localGuardian: {
//     type: localGuardianSchema,
//     required: true,
//   },
//   profileImg: { type: String },
//   isActive: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'Active',
//   },
// })

// export const StudentModel = model<Student>('Student', studentSchema)
