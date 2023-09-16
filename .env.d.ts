declare
{
	namespace NodeJs {
		interface ProcessEnv {
			SECRET_KEY: string
			PORT: number
			SERVER_PORT: number
			SESSION_SECRET: string
			PG_HOSTNAME: string
			PG_USERNAME: string
			PG_DATABASE: string
			PG_PASSWORD: string
			PG_PORT: number
			SALT: number
			BCRYPT_SRCRET: string
		}
	}
}
