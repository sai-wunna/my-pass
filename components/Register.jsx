import CustomButton from "./CustomButton";
import PasswordInput from "./PasswordInput";
import React, { useEffect, useState } from "react";
import { View, Text, Vibration, ToastAndroid } from "react-native";
import StorageAPI from "../api";
import generatePassword from "../services/generatePassword";
import Styles from "../Styles";
import { useGlobalState } from "../State";

export default function Register() {
	const { navigate } = useGlobalState();
	const [pin, setPin] = useState(""); // Store the PIN entered by the user
	const [error, setError] = useState(""); // Error message state

	// Function to validate the PIN when the user submits
	const handleLogin = async () => {
		if (pin.length === 8) {
			const result = await StorageAPI.register(pin);
			if (result.error) {
				setError(result.msg || "Something went wrong");
				Vibration.vibrate(1);
				setTimeout(() => setError(""), 3000);
				return;
			}
			ToastAndroid.show("Successfully created an account", 5000);
			navigate("home");
			return;
		} else {
			setError("PIN must be exactly 8 characters.");
			setTimeout(() => setError(""), 3000);
		}
	};

	useEffect(() => {
		setPin(generatePassword(8));
	}, []);

	return (
		<View
			style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}>
			<Text style={Styles.formTitle}>Enter Any 8 characters</Text>
			<PasswordInput password={pin} setPassword={setPin} />
			<Text style={Styles.errorMessage}>{error}</Text>
			<CustomButton
				text={"Register"}
				fullWidth
				handlePress={handleLogin}
				customStyles={{ marginTop: 50 }}
				color={"primary"}
			/>
		</View>
	);
}
