import { useGlobalState } from "../State";
import { Animated, Pressable, Vibration, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Styles from "../Styles";

function Header({ scrollY }) {
	const { logout, navigate } = useGlobalState();

	const headerHeight = scrollY.interpolate({
		inputRange: [0, 50],
		outputRange: [90, 60], // Header height shrinks when scrolling
		extrapolate: "clamp",
	});

	const titleFontSize = scrollY.interpolate({
		inputRange: [0, 50],
		outputRange: [20, 18], // Font size decreases when scrolling
		extrapolate: "clamp",
	});

	const toSetting = () => {
		Vibration.vibrate(1);
		navigate("setting");
	};

	return (
		<Animated.View
			style={[
				Styles.homePageHeader,
				{ height: headerHeight }, // Animated height for header
			]}>
			<Animated.View style={[Styles.homePageTitleContainer]}>
				<Animated.Text
					style={[Styles.homePageTitle, { fontSize: titleFontSize }]} // Animated font size for title
				>
					My Pass
				</Animated.Text>
				<View style={Styles.homePageHeaderNav}>
					<Pressable onPress={logout}>
						<View>
							<Animated.Text
								style={[{ fontSize: titleFontSize }]} // Animated font size for title
							>
								<Icon
									name="lock-closed-outline"
									color={"white"}
									size={20}
								/>
							</Animated.Text>
						</View>
					</Pressable>
					<Pressable onPress={toSetting}>
						<View>
							<Animated.Text
								style={[{ fontSize: titleFontSize }]} // Animated font size for title
							>
								<Icon
									name="information-circle"
									color={"white"}
									size={20}
								/>
							</Animated.Text>
						</View>
					</Pressable>
				</View>
			</Animated.View>
		</Animated.View>
	);
}

export default Header;
