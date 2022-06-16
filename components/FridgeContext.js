import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer, useContext, useEffect } from 'react';

const STORAGE_KEYS = {
	REVIEW: 'review item ids',
	FRIDGE: 'fridge items',
};

const ACTIONS = {
	RETRIEVE: 'retrieve items',
	ADD_ITEMS: 'add items',
	REMOVE_ITEM: 'remove item',
	EDIT_ITEM: 'edit item', // can remove if not used
};

export function reviewReducer(state, action) {
	switch (action.type) {
		case ACTIONS.RETRIEVE:
			const items = action.payload;
			console.log('reducer-retrieve state', state);
			if (state) {
				return [...state, ...items];
			} else {
				return items;
			}
		case ACTIONS.ADD_ITEMS:
			console.log('reducer-add state', state);
			const newItems = state ? [...state, ...action.payload] : action.payload;
			AsyncStorage.setItem(STORAGE_KEYS.REVIEW, JSON.stringify(newItems));
			return newItems;
		// case ACTIONS.REMOVE_ITEM:
		// 	console.log(state);
		// 	return { ...state, reviewItemIds: action.payload };
		// case ACTIONS.EDIT_ITEM:
		// return { ...state, reviewItemIds: action.payload };

		default:
			console.log('error', state, action);
			throw new Error();
	}
}

// DISPATCH HELPERS
const addReviewItems = (newItems) => {
	console.log(newItems);
	return {
		type: ACTIONS.ADD_ITEMS,
		payload: newItems,
	};
};

const removeReviewItems = async (idToRemove) => {
	// const reviewItems = await retrieveItemsLS();
	// const updatedReviewItems = reviewItems.filter((id) => id !== idToRemove);
	// updateItemsLS(updatedReviewItems);
	// return {
	// 	type: ACTIONS.REMOVE_ITEM,
	// 	payload: updatedReviewItems,
	// };
};

export const FridgeContext = React.createContext(null);

export function useFridgeContext() {
	return useContext(FridgeContext);
}

AsyncStorage.setItem(STORAGE_KEYS.REVIEW, JSON.stringify([1, 2, 3]), () =>
	console.log('done seeding item ids in asyncstorage: [1,2,3]')
);

export function FridgeContextProvider({ children }) {
	const [reviewItemIds, reviewDispatch] = useReducer(reviewReducer, null);
	// const [fridgeItems, fridgeItemsDispatch] = useReducer(fridgeReducer, []);

	// TODO: REDUCER FOR FRIDGE ITEMS

	const retrieveItemsFromAsyncStorage = () => {
		AsyncStorage.getItem(STORAGE_KEYS.REVIEW, (err, result) => {
			if (result) {
				console.log('<<<<<< retrieveItemsFromAsyncStorage');
				console.log('result', result);
				console.log('------------------------- >>>>>>>>>>');
				reviewDispatch({
					type: ACTIONS.RETRIEVE,
					payload: JSON.parse(result),
				});
				console.log('<<<<<< retrieveItemsFromAsyncStorage');
				console.log('reviewItemIds', reviewItemIds);
				console.log('------------------------- >>>>>>>>>>');
			}
		});
	};

	useEffect(() => {
		retrieveItemsFromAsyncStorage();
	}, []);

	useEffect(() => console.log('reviewItemIds', reviewItemIds), [reviewItemIds]);

	return (
		<FridgeContext.Provider
			value={{
				reviewItemIds,
				reviewDispatch,
				reviewDispatchHelpers: [addReviewItems, removeReviewItems],
			}}
		>
			{children}
		</FridgeContext.Provider>
	);
}
