import { Pressable, StyleSheet, Text } from "react-native";

export default function CustomButton({
	text,
	handlePress,
	color,
	fullWidth,
	customStyles,
}) {
	return (
		<Pressable
			onPress={handlePress || null}
			style={({ pressed }) => [
				styles.btn,
				styles[color] || styles.default,
				pressed && styles.pressed, // Optional: Change style on press
				fullWidth && { flex: 1 },
				{ pointerEvents: "auto" },
				{ ...(customStyles || {}) },
			]}>
			<Text style={styles.text}>{text}</Text>
		</Pressable>
	);
}
const styles = StyleSheet.create({
	btn: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		elevation: 2,
		minHeight: 50,
	},
	default: {
		backgroundColor: "#0051D4", // Slightly darker blue to match the gradient
	},
	primary: {
		backgroundColor: "#0040A6", // Muted navy for primary buttons
	},
	success: {
		backgroundColor: "#00A86B", // Emerald green for success
	},
	warning: {
		backgroundColor: "#FFC107", // Vibrant yellow for warnings
	},
	error: {
		backgroundColor: "#FF3B30", // Bright red for errors
	},
	text: {
		color: "white",
		textAlign: "center",
		fontWeight: "600", // Bold for better readability
		fontSize: 16,
	},
	pressed: {
		opacity: 0.8, // Subtle pressed effect
	},
});
