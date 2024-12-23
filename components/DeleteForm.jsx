import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Modal,
	Pressable,
	Vibration,
} from "react-native";
import CustomButton from "./CustomButton";
import { useGlobalState } from "../State";

const EditForm = ({ data, isModalVisible, setIsModalVisible }) => {
	const { deleteAccountInfo } = useGlobalState();
	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const handleSubmit = async () => {
		const result = await deleteAccountInfo(data.id);
		if (result.error) {
			setError(result.msg);
			Vibration.vibrate(1);
			return;
		}

		toggleModal();
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
						<View>
							<Text
								style={{
									textAlign: "center",
									marginBottom: 10,
									fontSize: 24,
								}}>
								{data.accountName}
							</Text>
							<Text
								style={{
									textAlign: "center",
									marginBottom: 50,
								}}>
								Are you sure to delete {data.platform} account
								info
							</Text>
							<CustomButton
								text={"Delete"}
								color="error"
								handlePress={handleSubmit}
								fullWidth
							/>
						</View>
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
});

export default EditForm;
