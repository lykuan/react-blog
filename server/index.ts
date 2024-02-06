import express, { Application } from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db"
import { authRoute } from "./routes/index-routes"
import { globalErrorHandler } from "./utils/appError"
import { logger } from "./utils/logger"

const app: Application = express()

dotenv.config()
connectDb()
app.use(express.json())
app.use(cors())
app.use("/auth", authRoute)
app.use(globalErrorHandler)

const port = process.env.PORT || 8800

app.listen(port, () => {
  console.log("server is running ...")
})


process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});