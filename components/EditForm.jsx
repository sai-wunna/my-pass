import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Modal,
	Pressable,
	Vibration,
} from "react-native";
import PlatformSelect from "./PlatformSelect"; // Ensure this path is correct
import CustomButton from "./CustomButton";
import PlatformIcon from "./PlatformIcon";
import PasswordInput from "./PasswordInput";
import { useGlobalState } from "../State";

const EdiAccountInfo = ({ data, isModalVisible, setIsModalVisible }) => {
	const { updateAccountInfo } = useGlobalState();
	const [accountName, setAccountName] = useState("Facebook");
	const [password, setPassword] = useState("");
	const [bindWith, setBindWith] = useState("");
	const [platform, setPlatform] = useState("Facebook"); // State for media type
	const [note, setNote] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (isModalVisible) {
			setAccountName(data.accountName);
			setPassword(data.password);
			setBindWith(data.bindWith);
			setPlatform(data.platform);
			setNote(data.note);
		}
	}, [isModalVisible]);

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const handleSubmit = async () => {
		// Handle form submission logic here
		if (!platform || !password || !bindWith) {
			return;
		}
		const accountInfo = {
			id: data.id,
			platform,
			password,
			accountName,
			bindWith,
			note,
		};

		const result = await updateAccountInfo(accountInfo);
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
		<Modal
			animationType="slide"
			transparent={true} // Set to true for a transparent background
			visible={isModalVisible}
			onRequestClose={toggleModal} // Handle back button on Android
		>
			<View style={styles.modalOverlay}>
				<Pressable style={styles.blankSpace} onPress={toggleModal}>
					<Text>he</Text>
				</Pressable>
				<View style={styles.modalContent}>
					{data && (
						<>
							<Text style={styles.title}>
								{platform ? (
									<PlatformIcon platform={platform} />
								) : (
									"Select New Platform Info"
								)}
							</Text>
							<PlatformSelect
								platform={platform}
								setPlatform={setPlatform}
							/>
							<Text style={styles.error}>{error}</Text>
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
									text={"Update"}
									handlePress={handleSubmit}
									fullWidth
								/>
							</View>
						</>
					)}
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
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
		marginBottom: 20,
	},
	input: {
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		paddingVertical: 10,
	},
});

export default EdiAccountInfo;
