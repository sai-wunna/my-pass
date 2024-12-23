import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Vibration,
	ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";
import PlatformIcon from "./PlatformIcon";
import Accordion from "./Accordion";
import generatePassword from "../services/generatePassword";
import * as Clipboard from "expo-clipboard";
import { useGlobalState } from "../State";

function AccountInformation() {
	const { accountInformation } = useGlobalState();
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [data, setData] = useState(null);

	const onEdit = (data) => {
		Vibration.vibrate(1);
		setData(data);
		setOpenEditModal(true);
	};

	const onDelete = (data) => {
		Vibration.vibrate(1);
		setData(data);
		setOpenDeleteModal(true);
	};

	const copyToClipboard = (password) => {
		Vibration.vibrate(1);
		Clipboard.setStringAsync(password); // Use setStringAsync for Expo
		ToastAndroid.show("Password copied to clipboard", 5000);
	};

	return (
		<>
			{accountInformation.map((acc) => (
				<View style={styles.AccountInformation} key={acc.id}>
					<Accordion
						Header={({ handleToggle, isOpen }) => (
							<View style={styles.headerContainer}>
								<PlatformIcon platform={acc.platform} />
								<Pressable
									style={({ pressed }) => [
										pressed && styles.pressed, // Optional: Change style on press
										{ pointerEvents: "auto" },
										{ flex: 1 },
									]}
									onLongPress={() =>
										copyToClipboard(acc.password)
									}>
									<Text style={styles.value}>
										{acc.accountName}
									</Text>
								</Pressable>
								<Pressable
									style={({ pressed }) => [
										pressed && styles.pressed, // Optional: Change style on press
										{ pointerEvents: "auto" },
									]}
									onPress={handleToggle}>
									<Icon
										name={
											isOpen ? "caret-up" : "caret-down"
										}
										color="grey"
										size={32}
									/>
								</Pressable>
							</View>
						)}>
						<View style={styles.container}>
							<View style={styles.info}>
								<Text style={styles.label}>Bind:</Text>
								<Text style={styles.value}>{acc.bindWith}</Text>
							</View>
							<View style={styles.info}>
								<Text style={styles.label}>Pwd:</Text>
								<Text style={styles.password}>
									{generatePassword()}
								</Text>
							</View>
							{acc.note && (
								<View style={styles.info}>
									<Text style={styles.label}>Note:</Text>
									<Text style={styles.value}>{acc.note}</Text>
								</View>
							)}
							{acc.modifiedAt && (
								<View style={styles.info}>
									<Text style={styles.label}>Modified:</Text>
									<Text style={styles.value}>
										{new Date(
											acc.modifiedAt
										).toLocaleDateString()}
									</Text>
								</View>
							)}
						</View>
						<View style={styles.footer}>
							<Text style={styles.createdDate}>
								{new Date(acc.createdAt).toLocaleDateString()}
							</Text>
							<View style={styles.iconContainer}>
								<Pressable
									style={({ pressed }) => [
										pressed && styles.pressed, // Optional: Change style on press
										{ pointerEvents: "auto" },
									]}
									onPress={() => onEdit(acc)}>
									<Icon
										name="create-outline"
										size={28}
										color="#0962e3"
									/>
								</Pressable>
								<Pressable
									style={({ pressed }) => [
										pressed && styles.pressed, // Optional: Change style on press
										{ pointerEvents: "auto" },
									]}
									onPress={() => onDelete(acc)}>
									<Icon
										name="trash-outline"
										size={28}
										color="#a43829"
									/>
								</Pressable>
							</View>
						</View>
					</Accordion>
				</View>
			))}
			<EditForm
				data={data}
				isModalVisible={openEditModal}
				setIsModalVisible={setOpenEditModal}
			/>
			<DeleteForm
				data={data}
				isModalVisible={openDeleteModal}
				setIsModalVisible={setOpenDeleteModal}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	AccountInformation: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: "white",
		marginVertical: 5,
		elevation: 5,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 5,
	},
	container: {
		paddingTop: 10,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 10,
		marginTop: 10,
	},
	iconContainer: {
		flexDirection: "row",
		gap: 10,
	},
	createdDate: {
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 20,
		backgroundColor: "#13547a",
		color: "white",
	},
	info: {
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		fontSize: 12,
		fontWeight: "300",
		marginRight: 5,
		color: "#555",
	},
	value: {
		color: "#333",
		fontWeight: "normal",
		width: "90%",
	},
	password: {
		color: "#000",
		fontWeight: "bold",
	},
	iconBtn: {
		borderRadius: "50%",
		borderWidth: 1,
		borderColor: "silver",
	},
	pressed: { opacity: 0.5 },
});

export default AccountInformation;
