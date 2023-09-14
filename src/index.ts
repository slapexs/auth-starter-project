import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session"
import dotenv from "dotenv"
dotenv.config()
const app = express()
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

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
