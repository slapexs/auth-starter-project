import express, { Application, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session"
import dotenv from "dotenv"

// Router
import registerRouter from "./routers/Register"
import loginRouter from "./routers/Login"

dotenv.config()
const app: Application = express()
const PORT = process.env.PORT || 3000
const SERVER_PORT = process.env.SERVER_PORT
const SESSION_SECRET = process.env.SESSION_SECRET as string
app.use(
	cors({
		credentials: true,
		origin: [`http://localhost:${SERVER_PORT}`],
	})
)
app.use(cookieParser())
app.use(express.json())
app.use(
	session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true })
)

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "Hello world" })
})

// Use router
app.use("/api/register", registerRouter)
app.use("/api/auth", loginRouter)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
