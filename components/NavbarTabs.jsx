import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Icon, Text } from 'native-base';
import EnterReceipt from './TabScreens/EnterReceipt.jsx';
import HomeScreen from './TabScreens/HomeScreen.jsx';
import Profile from './TabScreens/Profile.jsx';
// import Recipes from './TabScreens/Recipes.jsx';

const Tab = createBottomTabNavigator();

const focusedColor = 'primary.100';
const unfocusedColor = 'secondary.200';

function Label(text, focused) {
  return <Text fontSize="sm" marginBottom={1} color={focused ? focusedColor : unfocusedColor}>{text}</Text>;
}

function FridgeIcon(focused) {
  return (
    <Icon as={MaterialCommunityIcons} name="fridge" size="lg" color={focused ? focusedColor : unfocusedColor} marginTop={2} />
  );
}

function AddIcon(focused) {
  return <Icon as={MaterialIcons} name="add-box" size="lg" color={focused ? focusedColor : unfocusedColor} marginTop={2} />;
}

function ProfileIcon(focused) {
  return <Icon as={MaterialIcons} name="account-circle" size="lg" color={focused ? focusedColor : unfocusedColor} marginTop={2} />;
}

export default function NavbarTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarStyle: { height: 60 },
      tabBarActiveTintColor: focusedColor,
      tabBarInactiveTintColor: unfocusedColor,
    }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => Label('Home', focused),
          tabBarIcon: ({ focused }) => FridgeIcon(focused),
        }}
      />
      <Tab.Screen
        name="Add Items"
        component={EnterReceipt}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => Label('Add Items', focused),
          tabBarIcon: ({ focused }) => AddIcon(focused),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => Label('Profile', focused),
          tabBarIcon: ({ focused }) => ProfileIcon(focused),
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
    </Tab.Navigator>
  );
}
