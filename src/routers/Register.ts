import express, { Router, Request, Response } from "express"
import { randomUUID } from "crypto"
import connectdb from "../db/connectdb"
import { PoolClient, QueryResult } from "pg"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import IsStrongPassword from "../utility/IsStrongPassword"
dotenv.config()

const registerRouter: Router = express.Router()

// Register
registerRouter.post("/", async (req: Request, res: Response) => {
	try {
		const { email, password, name } = req.body

		// Check strong password
		if (!IsStrongPassword(password)) {
			return res.status(400).json({ message: "Password is not strong enough." })
		}
		const client: PoolClient = await connectdb.connect()
		const rows: QueryResult = await client.query(
			`select * from users where email =  '${email}'`
		)
		//check duplicate email
		if (rows.rowCount > 0) {
			return res.status(400).json({
				message: "Email is already registered",
			})
		}

		// insert new user
		const salt: number = parseInt(process.env.SALT as string)
		const passwordHashed = await bcrypt.hashSync(password, salt)
		const userId: string = randomUUID()
		await client.query(
			"insert into users (id, email, password, name) VALUES ($1, $2, $3, $4) RETURNING * ",
			[userId, email, passwordHashed, name]
		)
	} catch (error) {
		console.log(error)
		res.status(400).json({
			message: "Insert fail",
		})
	}
	// insert success response
	res.status(201).json({ message: "User registered successfully" })
})

export default registerRouter
