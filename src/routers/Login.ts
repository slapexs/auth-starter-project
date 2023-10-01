import express, { Router, Request, Response } from "express"
import dotenv from "dotenv"
import { FindUserByEmail } from "../utility/Users"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
dotenv.config()

const loginRouter: Router = express.Router()

loginRouter.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const findUser = await FindUserByEmail(email)

		// use first user
		const user = findUser[0]
		const isMatch = await bcrypt.compare(password, user.password as string)
		if (isMatch) {
			const authToken = jwt.sign(
				{ password, ...user },
				process.env.SECRET_KEY as string,
				{ expiresIn: "2h" }
			)
			res.cookie("authToken", authToken, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				maxAge: 300000,
			})
			res.status(200).json({ status: "Login success" })
		}
	} catch (err) {
		console.log(err)
		res.status(400).json({ status: err })
	}
})

export default loginRouter
