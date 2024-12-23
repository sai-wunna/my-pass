import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

const SpinningIcon = ({ children }) => {
	const spinValue = useRef(new Animated.Value(0)).current; // Create a new Animated Value

	// Spin animation
	const startSpin = () => {
		spinValue.setValue(0); // Reset the value to 0
		Animated.timing(spinValue, {
			toValue: 1,
			duration: 4000, // Duration of the spin
			useNativeDriver: true, // Use native driver for better performance
		}).start(() => startSpin()); // Repeat the animation
	};

	useEffect(() => {
		startSpin(); // Start the animation on component mount
	}, []);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"], // Spin from 0 to 360 degrees
	});

	return (
		<View style={{ alignItems: "center", justifyContent: "start" }}>
			<Animated.View style={{ transform: [{ rotate: spin }] }}>
				{children}
			</Animated.View>
		</View>
	);
};

export default SpinningIcon;
