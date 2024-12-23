import React, { useState } from "react";
import { TextInput, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function PasswordInput({ password, setPassword }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry={!isPasswordVisible} // Toggle visibility
			/>
			<Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
				<Icon
					name={isPasswordVisible ? "eye-off" : "eye"}
					size={24}
					color="gray"
				/>
			</Pressable>
		</View>
	);
}

const styles = {
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	input: {
		flex: 1,
		padding: 10,
	},
};
