/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import config from '../../../config'
import bcrypt from 'bcrypt'
// import { configDotenv } from 'dotenv'

const userSChema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

userSChema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data')
  // hashing password and save in to DB

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// post save middleware / hook
userSChema.post('save', function (doc, next) {
  // save empty string after saving password
  doc.password = ''
  // console.log(this, 'post hook: we save our data')
  next()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// static method
userSChema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password')
}

userSChema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

userSChema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000
  return passwordChangedTime > jwtIssuedTimestamp
}

export const User = model<TUser, UserModel>('User', userSChema)
