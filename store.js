export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3004';

import AsyncStorage from '@react-native-async-storage/async-storage';

// LOCAL STORAGE FUNCTIONS
export const storeData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (err) {
		console.log(err);
	}
};

export const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (err) {
		console.log(err);
	}
};
