import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer, useContext, useEffect } from 'react';

const STORAGE_KEYS = {
	REVIEW: 'review item ids',
	FRIDGE: 'fridge items',
};

const ACTIONS = {
	// for review reducer
	REVIEW: {
		RETRIEVE: 'retrieve items for review',
		ADD_ITEMS: 'add items to review',
		REMOVE_ITEM: 'remove item from review',
	},

	// for fridge reducer
	FRIDGE: {
		RETRIEVE: 'retrieve items from fridge',
		ADD_ITEMS: 'add items to fridge',
		REMOVE_ITEM: 'remove item from fridge',
	},
};

// ************************************
// --------- DISPATCH HELPERS ---------
// ************************************

const addReviewItems = (newItemsIds) => {
	console.log('review - ids to add', newItemsIds);
	return {
		type: ACTIONS.REVIEW.ADD_ITEMS,
		payload: newItemsIds,
	};
};

const removeReviewItem = (idToRemove) => {
	console.log('review - id to remove', idToRemove);
	return {
		type: ACTIONS.REVIEW.REMOVE_ITEM,
		payload: idToRemove,
	};
};

const addFridgeItems = (newItems) => {
	console.log('fridge - items to add', newItems);
	return {
		type: ACTIONS.FRIDGE.ADD_ITEMS,
		payload: newItems,
	};
};

const removeFridgeItem = (idToRemove) => {
	console.log('fridge - id to remove', idToRemove);
	return {
		type: ACTIONS.FRIDGE.REMOVE_ITEM,
		payload: idToRemove,
	};
};

// ************************************
// -------- REDUCER FUNCTIONS ---------
// ************************************

const reviewReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.REVIEW.RETRIEVE:
			const ids = action.payload;
			console.log('review reducer-retrieve state', state);
			if (state) {
				return [...state, ...ids];
			} else {
				return ids;
			}

		case ACTIONS.REVIEW.ADD_ITEMS:
			console.log('review reducer-add state', state);
			const newItems = state ? [...state, ...action.payload] : action.payload;
			AsyncStorage.setItem(STORAGE_KEYS.REVIEW, JSON.stringify(newItems));
			return newItems;

		case ACTIONS.REVIEW.REMOVE_ITEM:
			if (state) {
				const idToRemove = action.payload;
				const updatedItems = state.filter((id) => id !== idToRemove);
				AsyncStorage.setItem(STORAGE_KEYS.REVIEW, JSON.stringify(updatedItems));
				return updatedItems;
			} else break;

		default:
			console.log('error in review reducer', state, action);
			throw new Error();
	}
};

const fridgeReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.FRIDGE.RETRIEVE:
			const items = action.payload;
			console.log('fridge reducer-retrieve state', state);
			if (state) {
				return [...state, ...items];
			} else {
				return items;
			}

		case ACTIONS.FRIDGE.ADD_ITEMS:
			console.log('fridge reducer-add state', state);
			const newFridge = state ? [...state, ...action.payload] : action.payload;
			AsyncStorage.setItem(STORAGE_KEYS.FRIDGE, JSON.stringify(newFridge));
			return newFridge;

		case ACTIONS.FRIDGE.REMOVE_ITEM:
			if (state) {
				const idToRemove = action.payload;
				const updatedFridge = state.filter((item) => item.id !== idToRemove);
				AsyncStorage.setItem(
					STORAGE_KEYS.FRIDGE,
					JSON.stringify(updatedFridge)
				);
				return updatedFridge;
			} else break;

		default:
			console.log('error in fridge reducer', state, action);
			throw new Error();
	}
};

// ************************************
// -------- CONTEXT & PROVIDER --------
// ************************************

// Seed items in AsyncStorage to test reducer functions
// ** TODO: remove in deployment
AsyncStorage.clear();
AsyncStorage.setItem(STORAGE_KEYS.REVIEW, JSON.stringify([1, 2, 3]), () =>
	console.log('done seeding review item ids in asyncstorage: [1,2,3]')
);
AsyncStorage.setItem(
	STORAGE_KEYS.FRIDGE,
	JSON.stringify([{ id: 12, name: 'apricots' }]),
	() => console.log('done seeding fridge items in asyncstorage')
);

const FridgeContext = React.createContext(null);

// Call the below function when you want to use the FridgeContext
// eg, use --> const { reviewItemIds } = useFridgeContext()
// instead of: const { reviewItemIds } = useContext(FridgeContext)
export function useFridgeContext() {
	return useContext(FridgeContext);
}

export function FridgeContextProvider({ children }) {
	const [reviewItemIds, reviewDispatch] = useReducer(reviewReducer, null);
	const [fridgeItems, fridgeDispatch] = useReducer(fridgeReducer, null);

	const getReviewItemsFromAsyncStorage = () => {
		AsyncStorage.getItem(STORAGE_KEYS.REVIEW, (err, result) => {
			if (result) {
				console.log('<<<<<< getReviewItemsFromAsyncStorage');
				console.log('result', result);
				console.log('------------------------- >>>>>>>>>>');
				reviewDispatch({
					type: ACTIONS.REVIEW.RETRIEVE,
					payload: JSON.parse(result),
				});
				console.log('<<<<<< getReviewItemsFromAsyncStorage');
				console.log('reviewItemIds', reviewItemIds);
				console.log('------------------------- >>>>>>>>>>');
			}
		});
	};

	const getFridgeItemsFromAsyncStorage = () => {
		AsyncStorage.getItem(STORAGE_KEYS.FRIDGE, (err, result) => {
			if (result) {
				console.log('<<<<<< getFridgeItemsFromAsyncStorage');
				console.log('result', result);
				console.log('------------------------- >>>>>>>>>>');
				fridgeDispatch({
					type: ACTIONS.FRIDGE.RETRIEVE,
					payload: JSON.parse(result),
				});
				console.log('<<<<<< getFridgeItemsFromAsyncStorage');
				console.log('reviewItemIds', reviewItemIds);
				console.log('------------------------- >>>>>>>>>>');
			}
		});
	};

	useEffect(() => {
		getReviewItemsFromAsyncStorage();
		getFridgeItemsFromAsyncStorage();
	}, []);

	useEffect(() => {
		console.log('reviewItemIds', reviewItemIds);
		console.log('fridgeItems', fridgeItems);
	}, [reviewItemIds, fridgeItems]);

	return (
		<FridgeContext.Provider
			value={{
				reviewItemIds,
				reviewDispatch,
				reviewDispatchHelpers: [addReviewItems, removeReviewItem],
				fridgeItems,
				fridgeDispatch,
				fridgeDispatchHelpers: [addFridgeItems, removeFridgeItem],
			}}
		>
			{children}
		</FridgeContext.Provider>
	);
}
