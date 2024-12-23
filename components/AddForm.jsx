import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
	Modal,
	Vibration,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PlatformSelect from "./PlatformSelect"; // Ensure this path is correct
import CustomButton from "./CustomButton";
import PlatformIcon from "./PlatformIcon";
import PasswordInput from "./PasswordInput";
import generatePassword from "../services/generatePassword";
import { useGlobalState } from "../State";

const AddNewAccountInfo = () => {
	const { addNewAccountInfo, loadData } = useGlobalState();
	const [isModalVisible, setModalVisible] = useState(false);
	const [accountName, setAccountName] = useState("");
	const [password, setPassword] = useState("");
	const [bindWith, setBindWith] = useState("");
	const [platform, setPlatform] = useState("Facebook"); // State for media type
	const [note, setNote] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (isModalVisible) {
			setPassword(generatePassword());
		}
	}, [isModalVisible]);

	const toggleModal = () => {
		Vibration.vibrate(1);
		setModalVisible(!isModalVisible);
	};

	const handleSubmit = async () => {
		// Handle form submission logic here
		if (!platform || !password || !bindWith) {
			return;
		}
		const accountInfo = { platform, password, accountName, bindWith, note };

		const result = await addNewAccountInfo(accountInfo);
		if (result.error) {
			setError(result.msg);
			Vibration.vibrate(1);
			return;
		}

		toggleModal();
		setAccountName("");
		setPassword("");
		setNote("");
		setBindWith("");
	};

	return (
		<View style={styles.container}>
			{/* Floating Action Pressable */}
			<Pressable
				style={{ ...styles.fab, pointerEvents: "auto" }}
				onPress={toggleModal}>
				<Icon name="add" size={24} color="#fff" />
			</Pressable>

			{/* Modal for Adding Password Info */}
			<Modal
				animationType="slide"
				transparent={true} // Set to true for a transparent background
				visible={isModalVisible}
				onRequestClose={toggleModal} // Handle back button on Android
			>
				<View style={styles.modalOverlay}>
					<Pressable
						style={styles.blankSpace}
						onPress={toggleModal}></Pressable>
					<View style={styles.modalContent}>
						<Text style={styles.title}>
							{platform ? (
								<PlatformIcon platform={platform} />
							) : (
								"Add New Platform Info"
							)}
						</Text>
						<Text style={styles.error}>{error}</Text>
						<PlatformSelect
							platform={platform}
							setPlatform={setPlatform}
						/>
						<TextInput
							style={styles.input}
							placeholder="Account Name"
							value={accountName}
							onChangeText={setAccountName}
						/>
						<TextInput
							style={styles.input}
							placeholder="Bind with"
							value={bindWith}
							onChangeText={setBindWith}
						/>
						<PasswordInput
							password={password}
							setPassword={setPassword}
						/>
						<TextInput
							style={styles.input}
							placeholder="Note"
							value={note}
							multiline
							onChangeText={setNote}
						/>
						<View>
							<CustomButton
								text={"Save"}
								handlePress={handleSubmit}
								fullWidth
							/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fab: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 56,
		height: 56,
		backgroundColor: "#ff4081", // Customize your color
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center",
		elevation: 5, // Shadow effect for Android
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "flex-end", // Align modal to the bottom of the screen
		backgroundColor: "rgba(0, 0, 0, 0)", // Optional: semi-transparent background
	},
	blankSpace: {
		height: "100%",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		paddingVertical: 60,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		elevation: 50, // Shadow effect for Android
		height: "auto", // Set height to half of the screen
		gap: 20,
	},
	error: {
		textAlign: "center",
		color: "#470c19",
		marginVertical: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	input: {
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
});

export default AddNewAccountInfo;
