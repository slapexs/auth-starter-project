import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const AuthenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authToken } = req.cookies
	if (authToken == null) {
		return res.sendStatus(401)
	}

	try {
		const user = jwt.verify(authToken, process.env.SECRET_KEY as string)
		next()
	} catch (error) {
		console.log(error)
		res.status(403)
	}
}

export { AuthenticateToken }
