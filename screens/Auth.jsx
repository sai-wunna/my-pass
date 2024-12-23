import { Text, Pressable, View, Vibration } from "react-native";
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Styles from "../Styles";

export default function Entry() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<View>
			<Text style={Styles.appTitle}>My Pass</Text>
			<View style={Styles.authWrapper}>
				{isLogin ? <Login /> : <Register />}
				<View style={Styles.authNav}>
					<Pressable
						onPress={() => {
							Vibration.vibrate(1);
							setIsLogin(!isLogin);
						}}
						style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
						<Text
							style={{
								color: "white",
								padding: 20,
								fontWeight: 500,
								textDecorationLine: "underline",
							}}>
							{isLogin ? "Register" : "Login"}
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
