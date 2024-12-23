import React, { useState } from "react";
import {
	TextInput,
	FlatList,
	Text,
	Pressable,
	StyleSheet,
	View,
	Platform,
} from "react-native";

const PlatformSelect = ({ platform, setPlatform }) => {
	const [suggestions, setSuggestions] = useState([]);

	const data = [
		"Facebook",
		"YouTube",
		"WhatsApp",
		"Instagram",
		"TikTok",
		"WeChat",
		"Messenger",
		"Telegram",
		"Snapchat",
		"Douyin",
		"Reddit",
		"Pinterest",
		"Github",
		"LinkedIn",
		"Discord",
		"Twitch",
		"Viber",
		"Medium",
		"Quora",
		"Gmail",
		"X (formerly Twitter)",
		"Baidu Tieba",
		"Kuaishou",
		"Sina Weibo",
		"Vimeo",
		"Line",
		"Tumblr",
		"Flickr",
		"MySpace",
		"Mixi",
		"Xiaohongshu (Little Red Book)",
		"Clubhouse",
		"Microsoft",
		"Figma",
		"Yahoo",
	];

	const handleChangeText = (text) => {
		setPlatform(text);
		if (text) {
			const filteredSuggestions = data.filter((item) =>
				item.toLowerCase().includes(text.toLowerCase())
			);
			// Show only the first five suggestions
			setSuggestions(filteredSuggestions.slice(0, 5));
		} else {
			setSuggestions([]);
		}
	};

	const handleSelectSuggestion = (item) => {
		setPlatform(item);
		setSuggestions([]);
	};

	return (
		<View
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={100} // Adjust as needed
		>
			<TextInput
				style={styles.input}
				placeholder="Type or select a platform"
				value={platform}
				onChangeText={handleChangeText}
				onPress={() => setPlatform("")} // Optional: Clear suggestions on focus
			/>
			{suggestions.length > 0 && (
				<FlatList
					style={styles.suggestionList}
					data={suggestions} // Pass the filtered suggestions as data
					renderItem={({ item }) => (
						<Pressable onPress={() => handleSelectSuggestion(item)}>
							<Text style={styles.suggestion}>{item}</Text>
						</Pressable>
					)}
					keyExtractor={(item) => item} // Use item as key
					nestedScrollEnabled={true} // Enable nested scrolling if needed
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 999,
	},
	input: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	suggestionList: {
		position: "absolute",
		top: 50, // Adjust as necessary
		left: 0,
		right: 0,
		backgroundColor: "white",
		borderRadius: 5,
		elevation: 7,
	},
	suggestion: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
});

export default PlatformSelect;
