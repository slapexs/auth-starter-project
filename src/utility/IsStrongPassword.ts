function IsStrongPassword(password: string) {
	// Define regular expressions for different criteria
	const hasUppercase = /[A-Z]/.test(password)
	const hasLowercase = /[a-z]/.test(password)
	const hasNumbers = /\d/.test(password)
	const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)

	// Check if all criteria are met
	return (
		hasUppercase &&
		hasLowercase &&
		hasNumbers &&
		hasSpecialChars &&
		password.length >= 8 // You can adjust the minimum length as needed
	)
}

export default IsStrongPassword
