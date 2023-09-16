import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
	host: process.env.PG_HOSTNAME,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	user: process.env.PG_USERNAME,
	port: parseInt(process.env.PG_PORT as string),
})

export default pool
