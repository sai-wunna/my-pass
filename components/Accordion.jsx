import React, { useState } from "react";
import {
	View,
	StyleSheet,
	LayoutAnimation,
	Platform,
	UIManager,
} from "react-native";

// Enable LayoutAnimation on Android
if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({ Header, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setIsOpen(!isOpen);
	};

	return (
		<View style={styles.accordionContainer}>
			<Header handleToggle={toggleAccordion} isOpen={isOpen} />
			{isOpen && <View style={styles.content}>{children}</View>}
		</View>
	);
};

const styles = StyleSheet.create({
	accordionContainer: {
		borderRadius: 5,
		overflow: "hidden",
	},
	content: {
		padding: 10,
		backgroundColor: "#fff",
	},
});

export default Accordion;
