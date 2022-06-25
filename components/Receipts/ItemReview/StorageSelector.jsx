import React, { useEffect, useState } from 'react';
import {
  Box,
  Select,
  FormControl,
  Text,
  WarningOutlineIcon,
} from 'native-base';

import { useFridgeContext } from '../../FridgeContext.jsx';

const STORAGE_METHOD = 'storageMethod';
const SHELF_LIFE_ITEM_ID = 'shelfLifeItemId';

export default function StorageSelector({
  item,
  reviewItemId,
  selectedCategory,
  selectedStorage,
  setSelectedStorage,
}) {
  const { storageMethods } = selectedCategory;
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  useEffect(() => {
    console.log(item.storageMethod);

    if (storageMethods.length === 1) {
      const storage = storageMethods[0];
      setSelectedStorage(storage);
      reviewItemsDispatch(
        editReviewItem(reviewItemId, STORAGE_METHOD, storage.storageName)
      );
      reviewItemsDispatch(
        editReviewItem(
          reviewItemId,
          SHELF_LIFE_ITEM_ID,
          storage.shelfLifeItemId
        )
      );
    } else if (item.storageMethod) {
      const store = storageMethods.filter(
        (method) => item.storageMethod === method.storageName
      )[0];
      setSelectedStorage(store);
    }
  }, [selectedCategory]);

  const handleValueChange = (itemValue) => {
    const chosenStorage = storageMethods.filter(
      (item) => item.storageName === itemValue
    )[0];
    setSelectedStorage(chosenStorage);
    reviewItemsDispatch(
      editReviewItem(reviewItemId, STORAGE_METHOD, chosenStorage.storageName)
    );
    reviewItemsDispatch(
      editReviewItem(
        reviewItemId,
        SHELF_LIFE_ITEM_ID,
        chosenStorage.shelfLifeItemId
      )
    );
  };

  const handleSelectedValue = () => {
    if (storageMethods.length === 1) {
      return storageMethods[0].storageName;
    }
    if (item.storageMethod) {
      return selectedStorage?.storageName;
    }
    return null;
  };

  return (
    <Box w="75%">
      <FormControl isRequired isInvalid={!selectedStorage}>
        <Text fontSize="xs" textTransform="uppercase" color="primary.800">
          Storage Method
        </Text>
        <Select
          selectedValue={handleSelectedValue()}
          minWidth="200"
          placeholder="Choose a storage method"
          onValueChange={(itemValue) => {
            handleValueChange(itemValue);
          }}
          defaultValue={
            handleSelectedValue()
            // selectedStorage ? selectedStorage.storageName : null
          }
        >
          {selectedCategory.storageMethods.map((storageMethod) => (
            <Select.Item
              label={storageMethod.storageName}
              value={storageMethod.storageName}
              key={reviewItemId + storageMethod.storageName}
            />
          ))}
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please select a storage method
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
}
