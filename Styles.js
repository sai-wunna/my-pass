import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
	appWrapper: {
		flex: 1,
		elevation: 500,
	},
	appTitle: { padding: 20, fontSize: 32, color: "white" },
	authWrapper: {
		height: "80%",
		justifyContent: "center",
		position: "relative",
		padding: 20,
	},
	authNav: {
		position: "absolute",
		bottom: 0,
		right: 0,
		padding: 10,
	},
	formTitle: {
		textAlign: "center",
		marginBottom: 10,
	},
	errorMessage: {
		textAlign: "center",
		color: "#470c19",
	},
	homePage: { flex: 1, position: "relative", padding: 10 },
	scrollViewContainer: { paddingVertical: 100, paddingHorizontal: 5 },
	homePageHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		zIndex: 1000, // Ensure header stays on top
		alignItems: "center",
		justifyContent: "center",
	},
	homePageHeaderNav: { flexDirection: "row", gap: 20 },
	homePageTitleContainer: {
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	homePageTitle: { color: "white", paddingHorizontal: 10 },
	settingPage: {
		flex: 1,
		padding: 20,
	},
	settingPageNav: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	aboutAppContainer: {
		flex: 1,
		justifyContent: "center",
	},
});

export default Styles;
