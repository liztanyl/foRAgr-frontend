import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import EnterReceipt from './TabScreens/EnterReceipt';
import HomeScreen from './TabScreens/HomeScreen';
import Logout from './TabScreens/Logout';
import Recipes from './TabScreens/Recipes';

const Tab = createBottomTabNavigator();

export default function NavbarTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarLabel: 'Enter Receipt',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name="Enter Receipt"
				component={EnterReceipt}
				options={{
					tabBarLabel: 'Enter Receipt',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="receipt" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name="Recipes"
				component={Recipes}
				options={{
					tabBarLabel: 'Enter Receipt',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="food-turkey"
							size={24}
							color="black"
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Logout"
				component={Logout}
				options={{
					tabBarLabel: 'Enter Receipt',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="logout" size={24} color="black" />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
