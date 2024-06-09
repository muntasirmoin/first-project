/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/student/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import router from './app/router'
import cookieParser from 'cookie-parser'
const app: Application = express()
// const port = 3000

// parser
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'] }))

// application route

app.use('/api/v1', router)

// app.use('/api/v1/students', StudentRoutes)
// app.use('/api/v1/users', UserRoutes)

const test = async (req: Request, res: Response) => {
  Promise.reject()
}
app.get('/', test)

// global error
app.use(globalErrorHandler)

// not found

app.use(notFound)

export default app

// (req: Request, res: Response) => {
//   // res.send('Hello World!')

//   const a = 10
//   res.send(a)
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// console.log(process.cwd());
// G:\level2\first-project/.env
