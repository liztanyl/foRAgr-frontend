/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer, useContext, useEffect } from 'react';
import { useUserContext } from './UserContext.jsx';
import { BACKEND_URL } from '../store.js';

AsyncStorage.clear();

const STORAGE_KEYS = {
  REVIEW_IDS: 'review ids',
  REVIEW_ITEMS: 'review items',
  FRIDGE: 'fridge items',
};

const ACTIONS = {
  // for review ids reducer
  REVIEW_IDS: {
    RETRIEVE: 'retrieve item ids for review',
    ADD_IDS: 'add item ids to review',
    REMOVE_ID: 'remove item id from review',
    REMOVE_IDS: 'remove all item ids from review',
  },

  // for review items reducer
  REVIEW_ITEMS: {
    RETRIEVE: 'retrieve items for review',
    ADD_ITEMS: 'add items to review',
    EDIT_ITEM: 'edit item in review',
    REMOVE_ITEM: 'remove item from review',
    REMOVE_ITEMS: 'remove all items from review',
  },

  // for fridge reducer
  FRIDGE: {
    RETRIEVE: 'retrieve items from fridge',
    ADD_ITEMS: 'add items to fridge',
    REMOVE_ITEM: 'remove item from fridge',
    EDIT_ITEM: 'edit item in fridge',
  },
};

// ************************************
// --------- DISPATCH HELPERS ---------
// ************************************

// ---------- REVIEW IDS --------------
// --> Takes in an array of food item ids
const addReviewIds = (newIds) =>
  // console.log('review - ids to add', newIds);
  ({
    type: ACTIONS.REVIEW_IDS.ADD_IDS,
    payload: newIds,
  })
;

// --> Takes in one food item id
const removeReviewId = (idToRemove) =>
  // console.log('review - id to remove', idToRemove);
  ({
    type: ACTIONS.REVIEW_IDS.REMOVE_ID,
    payload: idToRemove,
  })
;

// --> Takes in no parameters - mutates entire array
const removeReviewIds = () =>
  // console.log('review - removes all ids');
  ({
    type: ACTIONS.REVIEW_IDS.REMOVE_IDS,
  })
;

// --------- REVIEW ITEMS -------------
// --> Takes in an array of review item objects
// with keys: name, categories, selectedCategory, selectedStorage
const addReviewItems = (newItems) =>
  // console.log('review - ids to add', newItems);
  ({
    type: ACTIONS.REVIEW_ITEMS.ADD_ITEMS,
    payload: newItems,
  })
;

// --> Takes in index of the review item object to update,
// the key to update (eg selectedCategory) and its new value
const editReviewItem = (id, key, value) =>
  // console.log(`review - id to edit (key: value), ${id} (${key}: ${value})`);
  ({
    type: ACTIONS.REVIEW_ITEMS.EDIT_ITEM,
    payload: {
      id,
      key,
      value,
    },
  })
;

// --> Takes in the index of the review item object to remove
const removeReviewItem = (idToRemove) =>
  // console.log('review - id to remove', idToRemove);
  ({
    type: ACTIONS.REVIEW_ITEMS.REMOVE_ITEM,
    payload: idToRemove,
  })
;

// --> Takes in no parameters - mutates entire array
const removeReviewItems = () => {
  console.log('review - remove all ids');
  return {
    type: ACTIONS.REVIEW_ITEMS.REMOVE_ITEMS,
  };
};

// --------- FRIDGE ITEMS -------------
// --> Takes in array of items to add to fridge
const addFridgeItems = (newItems) =>
  // console.log('fridge - items to add', newItems);
  ({
    type: ACTIONS.FRIDGE.ADD_ITEMS,
    payload: newItems,
  })
;

// Takes in index of fridge item to remove
const removeFridgeItem = (indexToRemove) =>
  // console.log('fridge - id to remove', indexToRemove);
  ({
    type: ACTIONS.FRIDGE.REMOVE_ITEM,
    payload: indexToRemove,
  });
const editFridgeItem = (id, key, value) =>
  // console.log('fridge - id to remove', id);
  ({
    type: ACTIONS.FRIDGE.EDIT_ITEM,
    payload: {
      id,
      key,
      value,
    },
  })
;

// ************************************
// -------- REDUCER FUNCTIONS ---------
// ************************************

const reviewIdsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.REVIEW_IDS.RETRIEVE: {
      const ids = action.payload;
      // console.log('reviewIdsReducer-retrieve state', state);
      if (state) return [...state, ...ids];
      return ids;
    }

    case ACTIONS.REVIEW_IDS.ADD_IDS: {
      // console.log('reviewIdsReducer-add state', state);
      const newIds = state ? [...state, ...action.payload] : action.payload;
      AsyncStorage.setItem(STORAGE_KEYS.REVIEW_IDS, JSON.stringify(newIds));
      return newIds;
    }

    case ACTIONS.REVIEW_IDS.REMOVE_ID: {
      if (state) {
        // console.log('reviewIdsReducer-remove state', state);
        const idToRemove = action.payload;
        const updatedIds = state.filter((id) => id !== idToRemove);
        AsyncStorage.setItem(STORAGE_KEYS.REVIEW_IDS,
          JSON.stringify(updatedIds));
        return updatedIds;
      }
      break;
    }

    case ACTIONS.REVIEW_IDS.REMOVE_IDS: {
      if (state) {
        // console.log('reviewIdsReducer-remove-ids state', state);
        AsyncStorage.removeItem(STORAGE_KEYS.REVIEW_IDS);
        return null;
      }
      break;
    }

    default: {
      // console.log('error in review reducer', state, action);
      throw new Error();
    }
  }
};

const reviewItemsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.REVIEW_ITEMS.RETRIEVE: {
      const items = action.payload;
      // console.log('reviewItemsReducer-retrieve state', state);
      if (state) return [...state, ...items];
      return items;
    }

    case ACTIONS.REVIEW_ITEMS.ADD_ITEMS: {
      // console.log('reviewItemsReducer-add state', state);
      const newItems = state ? [...state, ...action.payload] : action.payload;
      AsyncStorage.setItem(STORAGE_KEYS.REVIEW_ITEMS, JSON.stringify(newItems));
      return newItems;
    }

    case ACTIONS.REVIEW_ITEMS.EDIT_ITEM: {
      if (state) {
        // console.log('reviewItemsReducer-edit state', state);
        const { id, key, value } = action.payload;
        const updatedItems = [...state];
        const i = updatedItems.findIndex((item) => item.id === id);
        updatedItems[i][key] = value;
        AsyncStorage.setItem(STORAGE_KEYS.REVIEW_ITEMS,
          JSON.stringify(updatedItems));
        return updatedItems;
      }
      break;
    }

    case ACTIONS.REVIEW_ITEMS.REMOVE_ITEM: {
      if (state) {
        // console.log('reviewItemsReducer-remove state', state);
        const idToRemove = action.payload;
        const updatedItems = [...state].filter((item) => item.id !== idToRemove);
        AsyncStorage.setItem(STORAGE_KEYS.REVIEW_ITEMS,
          JSON.stringify(updatedItems));
        return updatedItems;
      }
      break;
    }

    case ACTIONS.REVIEW_ITEMS.REMOVE_ITEMS: {
      if (state) {
        // console.log('reviewItemsReducer-remove state', state);
        AsyncStorage.removeItem(STORAGE_KEYS.REVIEW_ITEMS);
        return null;
      }
      break;
    }

    default: {
      // console.log('error in review reducer', state, action);
      throw new Error();
    }
  }
};

const fridgeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FRIDGE.RETRIEVE: {
      return action.payload;
    }

    case ACTIONS.FRIDGE.ADD_ITEMS: {
      // console.log('fridge reducer-add state', state);
      const newFridge = state ? [...state, ...action.payload] : action.payload;
      AsyncStorage.setItem(STORAGE_KEYS.FRIDGE, JSON.stringify(newFridge));
      return newFridge;
    }

    case ACTIONS.FRIDGE.REMOVE_ITEM: {
      if (state) {
        // console.log('fridge reducer-remove state', state);
        const idToRemove = action.payload;
        const updatedFridge = state.filter((item) => item.id !== idToRemove);
        AsyncStorage.setItem(STORAGE_KEYS.FRIDGE,
          JSON.stringify(updatedFridge));
        return updatedFridge;
      }
      break;
    }
    case ACTIONS.FRIDGE.EDIT_ITEM: {
      if (state) {
        // console.log('fridge reducer-edit state', state);
        const { id, key, value } = action.payload;
        const updatedContent = [...state];
        const i = updatedContent.findIndex((item) => item.id === id);
        updatedContent[i][key] = value;
        // console.log(updatedContent);
        AsyncStorage.setItem(STORAGE_KEYS.FRIDGE,
          JSON.stringify(updatedContent));
        return updatedContent;
      }
      break;
    }

    default: {
      // console.log('error in fridge reducer', state, action);
      throw new Error();
    }
  }
};

// ************************************
// -------- CONTEXT & PROVIDER --------
// ************************************

// Seed items in AsyncStorage to test reducer functions
// ** TODO: remove in deployment
/* const seedFridgeItems = [{
  id: 31,
  name: 'beef stock',
  category: 'Soups',
  storageMethod: 'Fridge',
  purchaseDate: '19-06-2022',
  expiryDate: '22-06-2022',
}, {
  id: 49,
  name: 'broccoli',
  category: 'Fruits & Vegetables',
  storageMethod: 'Fridge',
  purchaseDate: '19-06-2022',
  expiryDate: '22-06-2022',
}];
AsyncStorage.clear();
AsyncStorage.setItem(STORAGE_KEYS.REVIEW_IDS,
  JSON.stringify([1, 2, 3]),
  () => console.log('done seeding review ids in asyncstorage: [1,2,3]'));
AsyncStorage.setItem(STORAGE_KEYS.FRIDGE,
  JSON.stringify(seedFridgeItems),
  () => console.log('done seeding fridge items in asyncstorage'));
 */

const FridgeContext = React.createContext(null);

// Call the below function when you want to use the FridgeContext
// eg, use --> const { reviewIds  } = useFridgeContext()
// instead of: const { reviewIds } = useContext(FridgeContext)
export function useFridgeContext() {
  return useContext(FridgeContext);
}

export function FridgeContextProvider({ children }) {
  // reviewIds is an array of food item ids
  const [reviewIds, reviewIdsDispatch] = useReducer(reviewIdsReducer, null);

  // reviewItems is an array of review item objects
  const [reviewItems, reviewItemsDispatch] = useReducer(reviewItemsReducer,
    null);

  // fridgeItems is an array of fridge item objects
  const [fridgeItems, fridgeDispatch] = useReducer(fridgeReducer, null);
  const { jwtToken, userDetails } = useUserContext();

  const getReviewIdsFromAsyncStorage = () => {
    AsyncStorage.getItem(STORAGE_KEYS.REVIEW_IDS, (err, result) => {
      if (err) console.log(err);
      if (result) {
        // console.log('<<<<<< getReviewItemsFromAsyncStorage');
        // console.log('    result', result);
        // console.log('------------------------- >>>>>>>>>>');
        reviewIdsDispatch({
          type: ACTIONS.REVIEW_IDS.RETRIEVE,
          payload: JSON.parse(result),
        });
      }
    });
  };

  const getReviewItemsFromAsyncStorage = () => {
    AsyncStorage.getItem(STORAGE_KEYS.REVIEW_ITEMS, (err, result) => {
      if (err) console.log(err);
      if (result) {
        // console.log('<<<<<< getReviewItemsFromAsyncStorage');
        // console.log('    result', result);
        // console.log('------------------------- >>>>>>>>>>');
        reviewItemsDispatch({
          type: ACTIONS.REVIEW_ITEMS.RETRIEVE,
          payload: JSON.parse(result),
        });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      getReviewIdsFromAsyncStorage();
      getReviewItemsFromAsyncStorage();
      console.log('😛', jwtToken);
      axios
        .get(`${BACKEND_URL}/fridgeItems/index/${jwtToken}`)
        .then((response) => {
          fridgeDispatch({
            type: ACTIONS.FRIDGE.RETRIEVE,
            payload: response.data,
          });
        });
      // getFridgeItemsFromAsyncStorage();
      // console.log(fridgeItems);
    }
  }, [userDetails]);

  // useEffect(() => {
  //   console.log('reviewIds', reviewIds);
  //   console.log('reviewItems', reviewItems);
  //   console.log('fridgeItems', fridgeItems);
  // }, [reviewIds, reviewItems, fridgeItems]);

  // ****************************
  //
  // To use the FridgeContext:
  //
  // import { useFridgeContext } from '..<PATH>../FridgeContext.jsx';
  //
  // const {
  //   reviewIds, reviewIdsDispatch,
  //   dispatchHelpers: { addReviewIds } <-- nested destructuring
  // } = useFridgeContext();
  //
  // ****************************

  return (
    <FridgeContext.Provider
      value={{
        reviewIds,
        reviewIdsDispatch,
        reviewItems,
        reviewItemsDispatch,
        fridgeItems,
        fridgeDispatch,
        dispatchHelpers: {
          addReviewIds,
          removeReviewId,
          removeReviewIds,
          addReviewItems,
          editReviewItem,
          removeReviewItem,
          removeReviewItems,
          addFridgeItems,
          removeFridgeItem,
          editFridgeItem,
        },
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
}
