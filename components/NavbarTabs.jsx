import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  // MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';

import EnterReceipt from './TabScreens/EnterReceipt.jsx';
import HomeScreen from './TabScreens/HomeScreen.jsx';
import Profile from './TabScreens/Profile.jsx';
// import Recipes from './TabScreens/Recipes.jsx';

const Tab = createBottomTabNavigator();

export default function NavbarTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Add Items"
        component={EnterReceipt}
        options={{
          tabBarLabel: 'Add Items',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={24} color="black" />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Recipes"
        component={Recipes}
        options={{
          tabBarLabel: 'Recipes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-turkey"
              size={24}
              color="black"
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
