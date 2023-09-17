import connectdb from "../db/connectdb"
import { PoolClient, QueryResult } from "pg"
import { UserData } from "../model/UsersType"

// find user by email
const FindUserByEmail = async (email: string) => {
	const client: PoolClient = await connectdb.connect()
	const queryString: QueryResult = await client.query(
		`select * from public.users where email = '${email}'`
	)
	if (queryString.rowCount > 0) {
		const responseData: UserData[] = queryString.rows.map((user) => {
			const { role, ...userData } = user
			return userData
		})
		return responseData
	} else {
		return []
	}
}

export { FindUserByEmail }
