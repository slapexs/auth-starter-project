import { Request, Response, NextFunction } from "express"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const AuthenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authToken } = req.cookies
	if (authToken == null) {
		return res
			.status(401)
			.json({ status: "Authentication failed. No token provided." })
	}

	try {
		jwt.verify(authToken, process.env.SECRET_KEY as string)
		next()
	} catch (error) {
		console.log(error)
		// Token expired
		if (error instanceof TokenExpiredError) {
			return res
				.status(401)
				.json({ status: "Authentication failed. Token expired." })
		}
		return res.status(401).json({ status: "Unauthorized" })
	}
}

export { AuthenticateToken }
