import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'
// middleware
export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // validation check
    // if everything allRight next()
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    })
    next()
  })
}
