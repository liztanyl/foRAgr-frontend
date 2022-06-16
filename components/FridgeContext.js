import React, { useReducer, useContext, useEffect } from 'react';
import { storeData, getData } from '../store';

const fridgeItemStorageKey = 'fridgeItems';

const initialState = {
	fridgeItemIds: [1, 2, 3, 4],
};

const ACTIONS = {
	RETRIEVE: 'retrieve items',
	ADD_ITEMS: 'add items',
	REMOVE_ITEM: 'remove item',
	EDIT_ITEM: 'edit item',
};

export function fridgeReducer(state, action) {
	switch (action.type) {
		case ACTIONS.RETRIEVE:
			return action.payload;
		case ACTIONS.ADD_ITEMS:
			return action.payload;
		case ACTIONS.REMOVE_ITEM:
			return action.payload;
		// case ACTIONS.EDIT_ITEM:
		// 	return action.payload;
		default:
			throw new Error();
	}
}

// LOCAL STORAGE HELPERS
const retrieveItemsLS = async () => {
	return await getData(fridgeItemStorageKey);
};

const updateItemsLS = async (newState) => {
	return await storeData(fridgeItemStorageKey, newState);
};

// DISPATCH HELPERS
const retrieveFridgeItems = () => {
	const fridgeItems = retrieveItemsLS();

	return {
		type: ACTIONS.RETRIEVE,
		payload: fridgeItems,
	};
};

const addFridgeItems = async (newItems) => {
	const fridgeItems = await retrieveItemsLS();
	// TODO: CHECK FOR DUPLICATES
	const updatedFridgeItems = [...fridgeItems, ...newItems];
	updateItemsLS(updatedFridgeItems);

	return {
		type: ACTIONS.ADD_ITEMS,
		payload: updatedFridgeItems,
	};
};

const removeFridgeItem = async (idToRemove) => {
	const fridgeItems = await retrieveItemsLS();
	const updatedFridgeItems = fridgeItems.filter((id) => id !== idToRemove);
	updateItemsLS(updatedFridgeItems);

	return {
		type: ACTIONS.REMOVE_ITEM,
		payload: updatedFridgeItems,
	};
};

export const FridgeContext = React.createContext(null);

export function useFridgeContext() {
	return useContext(FridgeContext);
}

export function FridgeContextProvider({ children }) {
	const [fridgeState, fridgeDispatch] = useReducer(fridgeReducer, initialState);

	useEffect(() => {
		fridgeDispatch(retrieveFridgeItems());
	}, []);

	return (
		<FridgeContext.Provider
			value={{
				fridgeState,
				fridgeDispatch,
				fridgeDispatchHelpers: [
					retrieveFridgeItems,
					addFridgeItems,
					removeFridgeItem,
				],
			}}
		>
			{children}
		</FridgeContext.Provider>
	);
}
