import { View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalState } from "./State";
import HomeScreen from "./screens/Home";
import AuthScreen from "./screens/Auth";
import SettingScreen from "./screens/Setting";
import Styles from "./Styles";

const Router = () => {
	const { route } = useGlobalState();

	return (
		<LinearGradient
			colors={["#4c669f", "#3b5998", "#192f6a"]}
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0 }}
			style={Styles.appWrapper}>
			{route === "home" ? (
				<HomeScreen />
			) : route === "setting" ? (
				<SettingScreen />
			) : (
				<AuthScreen />
			)}
		</LinearGradient>
		// </LinearGradient>
	);
};

export default Router;
