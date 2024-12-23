import { StatusBar } from "react-native";
import Router from "./Router";
import { GlobalStateProvider } from "./State";

export default function RootLayout() {
	return (
		<GlobalStateProvider>
			<StatusBar />
			<Router />
		</GlobalStateProvider>
	);
}
