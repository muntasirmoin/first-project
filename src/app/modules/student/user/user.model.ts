import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import config from '../../../config'
import bcrypt from 'bcrypt'
// import { configDotenv } from 'dotenv'

const userSChema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
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

export const User = model<TUser>('User', userSChema)
