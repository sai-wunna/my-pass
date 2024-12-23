function generatePassword(length = 8, options = {}) {
	const {
		includeUppercase = true,
		includeNumbers = true,
		includeSpecialCharacters = true,
	} = options;

	let charset = "abcdefghijklmnopqrstuvwxyz"; // Base charset (lowercase letters)

	if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Add uppercase letters
	if (includeNumbers) charset += "0123456789"; // Add numbers
	if (includeSpecialCharacters) charset += "!@#$%^&*()_+<>?"; // Add special characters

	let password = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}

	return password;
}

export default generatePassword;
