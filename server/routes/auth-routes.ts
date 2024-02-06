import { Router } from "express"
import { signIn, signUp } from "../controller/auth-contorller"
const authRoute: Router = Router()

authRoute.post("/signup", signUp)
authRoute.post("/signIn", signIn)

export default authRoute
