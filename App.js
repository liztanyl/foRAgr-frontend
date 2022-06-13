import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TestComponent from "./components/TestComponent";

export default function App() {
	return (
		<View style={styles.container}>
			<Text>wow this is an amazing fridge app that works on android????</Text>
			<StatusBar style="auto" />
			<TestComponent />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
