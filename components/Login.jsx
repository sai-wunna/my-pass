import CustomButton from "./CustomButton";
import PasswordInput from "./PasswordInput";
import React, { useState } from "react";
import { View, Text, Vibration } from "react-native";
import StorageAPI from "../api";
import { useGlobalState } from "../State";
import Styles from "../Styles";

export default function Login() {
	const { loadData, navigate } = useGlobalState();
	const [pin, setPin] = useState(""); // Store the PIN entered by the user
	const [error, setError] = useState(""); // Error message state

	// Function to validate the PIN when the user submits
	const handleLogin = async () => {
		if (pin.length === 8) {
			const result = await StorageAPI.login(pin);
			if (result.error) {
				setError(result.msg || "Something went wrong");
				Vibration.vibrate(1);
				setTimeout(() => setError(""), 3000);
				return;
			}
			loadData();
			navigate("home");
			return;
		} else {
			setError("PIN must be exactly 8 characters.");
			setTimeout(() => setError(""), 3000);
		}
	};

	return (
		<View
			style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}>
			<PasswordInput password={pin} setPassword={setPin} />
			<Text style={Styles.errorMessage}>{error}</Text>
			<CustomButton
				text={"Login"}
				fullWidth
				handlePress={handleLogin}
				customStyles={{ marginTop: 50 }}
				color={"primary"}
			/>
		</View>
	);
}
