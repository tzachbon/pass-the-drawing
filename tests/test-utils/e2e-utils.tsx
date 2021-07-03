
export const PORT = 5000
export const URL = `http://localhost:${PORT}`

export function getFakeUsers() {
	return [
		{
			email: 'test_user_1@ptd.com',
			password: process.env.FIRST_TEST_USER_PASSWORD,
		},
		{
			email: 'test_user_2@ptd.com',
			password: process.env.SECOND_TEST_USER_PASSWORD,
		},
		{
			email: 'test_user_3@ptd.com',
			password: process.env.THIRD_TEST_USER_PASSWORD,
		},
	]
}