import {
	View,
	Text,
	Pressable,
	Vibration,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useGlobalState } from "../State";

const Setting = () => {
	const owner = "@string";
	const portfolioUrl = "https://github.com/sai-wunna";

	const { navigate } = useGlobalState();

	const toHome = () => {
		Vibration.vibrate(1);
		navigate("home");
	};

	return (
		<View style={Styles.settingPage}>
			<View style={Styles.settingPageNav}>
				<Pressable onPress={toHome}>
					<View>
						<Icon
							name="arrow-back-outline"
							color={"white"}
							size={32}
						/>
					</View>
				</Pressable>
			</View>
			<View style={Styles.container}>
				<Text style={Styles.title}>About My Pass</Text>
				<Text style={Styles.section}>
					This password manager app is designed to securely store,
					manage, and retrieve your passwords easily. With strong
					encryption and simple backup/import features, your data is
					always safe and accessible.
				</Text>
				<View style={Styles.listContainer}>
					<Text style={Styles.listItem}>
						• This is an offline app.
					</Text>
					<Text style={Styles.listItem}>
						• Import file name must be{" "}
						<Text style={Styles.bold}>my_pass_backup.json</Text>.
					</Text>
					<Text style={Styles.listItem}>
						• Store backup passwords securely as they are decrypted.
					</Text>
					<Text style={Styles.listItem}>
						• Regularly create backups to avoid data loss.
					</Text>
				</View>
				<View style={Styles.footer}>
					<TouchableOpacity
						onPress={() => Linking.openURL(portfolioUrl)}>
						<Text>
							Crafted by <Text style={Styles.link}>{owner}</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const Styles = StyleSheet.create({
	settingPage: {
		flex: 1,
		padding: 20,
	},
	settingPageNav: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	container: {
		flex: 1,
		padding: 10,
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 15,
		color: "silver",
	},
	section: {
		fontSize: 16,
		color: "white",
		marginBottom: 10,
		lineHeight: 22,
	},
	listContainer: {
		marginTop: 10,
		marginBottom: 20,
		paddingLeft: 10,
	},
	listItem: {
		fontSize: 16,
		color: "white",
		marginBottom: 8,
		lineHeight: 22,
	},
	bold: {
		fontWeight: "bold",
		color: "white",
	},
	footer: {
		position: "absolute",
		bottom: 20,
		right: 20,
		fontSize: 14,
	},
	link: {
		color: "white",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
});

export default Setting;
