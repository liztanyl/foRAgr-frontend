import React, { useReducer, useContext, useEffect } from 'react';
import { storeData, getData } from '../store';

const reviewItemLSKey = 'fridgeItems';

const initialState = {
	fridgeItems: [],
	reviewItemIds: [],
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
			console.log({ ...state, reviewItemIds: action.payload });
			return { ...state, reviewItemIds: action.payload };
		case ACTIONS.ADD_ITEMS:
			console.log(state);
			return { ...state, reviewItemIds: action.payload };
		case ACTIONS.REMOVE_ITEM:
			console.log(state);
			return { ...state, reviewItemIds: action.payload };
		// case ACTIONS.EDIT_ITEM:
		// return { ...state, reviewItemIds: action.payload };

		default:
			throw new Error();
	}
}

// LOCAL STORAGE HELPERS
const retrieveItemsLS = async () => {
	return await getData(reviewItemLSKey);
};

const updateItemsLS = async (newState) => {
	return await storeData(reviewItemLSKey, newState);
};

// DISPATCH HELPERS
const retrieveReviewItems = () => {
	const reviewItems = retrieveItemsLS();

	return {
		type: ACTIONS.RETRIEVE,
		payload: reviewItems,
	};
};

const addReviewItems = async (newItems) => {
	const reviewItems = await retrieveItemsLS();
	let updatedReviewItems = null;
	// TODO: CHECK FOR DUPLICATES
	if (!reviewItems){ // << Tabs: Added this because when reviewItems is null, it throws an error below in line 62
		updatedReviewItems = [...newItems]
	} else {
		updatedReviewItems = [...reviewItems, ...newItems];
	}

	updateItemsLS(updatedReviewItems);

	return {
		type: ACTIONS.ADD_ITEMS,
		payload: updatedReviewItems,
	};
};

const removeReviewItems = async (idToRemove) => {
	const reviewItems = await retrieveItemsLS();
	const updatedReviewItems = reviewItems.filter((id) => id !== idToRemove);
	updateItemsLS(updatedReviewItems);

	return {
		type: ACTIONS.REMOVE_ITEM,
		payload: updatedReviewItems,
	};
};

export const FridgeContext = React.createContext(null);

export function useFridgeContext() {
	return useContext(FridgeContext);
}

export function FridgeContextProvider({ children }) {
	const [reviewState, reviewDispatch] = useReducer(
		reviewReducer,
		initialState.reviewItemIds
	);

	// TODO: REDUCER FOR FRIDGE ITEMS

	useEffect(() => {
		reviewDispatch(retrieveReviewItems());
		console.log(reviewState);
	}, []);

	return (
		<FridgeContext.Provider
			value={{
				reviewState,
				reviewDispatch,
				reviewDispatchHelpers: [
					retrieveReviewItems,
					addReviewItems,
					removeReviewItems,
				],
			}}
		>
			{children}
		</FridgeContext.Provider>
	);
}
