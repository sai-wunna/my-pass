import { Animated, View } from "react-native";
import React, { useRef } from "react";
import Header from "../components/Header";
import AccountInformation from "../components/AccountInformation";
import Styles from "../Styles";
import AddForm from "../components/AddForm";

const Home = () => {
	const scrollY = useRef(new Animated.Value(0)).current;

	return (
		<View style={Styles.homePage}>
			<Header scrollY={scrollY} />
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={Styles.scrollViewContainer}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16} // This ensures smooth tracking of the scroll position
			>
				<AccountInformation />
			</Animated.ScrollView>
			<AddForm />
		</View>
	);
};

export default Home;
