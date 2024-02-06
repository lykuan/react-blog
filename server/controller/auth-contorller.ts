import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Cookies from "cookies"
import { User } from "../model/User"
import { logger } from "../utils/logger"
import AppError from "../utils/appError"
const model = new User().$model()

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isExisting = await model.findOne({ email: req.body.email })
    console.log(isExisting)

    if (isExisting) {
      logger.child({ user: req.body.email }).error("user exists")
      next(new AppError("user exists", 400, "The account has already existed"))
    }

    const salt = bcrypt.genSaltSync(10)
    const hashpwd = bcrypt.hashSync(req.body.password, salt)
    const result = await model.create({ ...req.body, password: hashpwd })
    console.log(result)

    if (result) {
      logger.child({ user: result.email }).info("user account is created")
      res.status(200).json(result)
    }
  } catch (error) {
    if (error instanceof Error) next(error.message)
  }
}
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { email, password: pwd } = req.body
    const user = await model.findOne({ email })
    const signInLogger = logger.child({ user: email })
    if (!user) {
      signInLogger.error(`account is not existing`)
      next(
        new AppError("user not exisiting", 404, "the account is not existing")
      )
    }
    const pwdCorrected = await bcrypt.compare(pwd, String(user!.password))
    if (!pwdCorrected) {
      signInLogger.error("password is wrong")
      next(
        new AppError(
          "password is wrong",
          403,
          "input password is not correct,please again"
        )
      )
    }

    const token = jwt.sign(
      { data: email, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.JWT_KEY!
    )
    const cookies = new Cookies(req, res)
    cookies.set("token", token)

    const { ...baseUser } = user as any
    const { password, ...userBaseInfo } = baseUser["_doc"]
    signInLogger.info("sign in scucessfully")
    res.status(200).json({ message: "sign in successfully", userBaseInfo })
  } catch (error) {
    if (error instanceof Error) next(error.message)
  }
}
