import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

import NavbarTabs from "./components/NavbarTabs";

export default function App() {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<NavbarTabs />
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
