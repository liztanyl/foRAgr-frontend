import React, { useEffect } from 'react';
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
    if (storageMethods.length === 1) {
      const storage = storageMethods[0];
      setSelectedStorage(storage);
      console.log(storage.storageName);
      reviewItemsDispatch(editReviewItem(reviewItemId,
        STORAGE_METHOD,
        storage.storageName));
      reviewItemsDispatch(editReviewItem(reviewItemId,
        SHELF_LIFE_ITEM_ID,
        storage.shelfLifeItemId));
    }
  }, [selectedCategory]);

  const handleValueChange = (itemValue) => {
    const chosenStorage = storageMethods.filter((item) => item.storageName === itemValue)[0];
    setSelectedStorage(chosenStorage);
    reviewItemsDispatch(editReviewItem(reviewItemId,
      STORAGE_METHOD,
      chosenStorage.storageName));
    reviewItemsDispatch(editReviewItem(reviewItemId,
      SHELF_LIFE_ITEM_ID,
      chosenStorage.shelfLifeItemId));
    console.log(selectedStorage);
  };

  return (
    <Box w="75%">
      <FormControl isRequired isInvalid={!selectedStorage}>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          color="primary.800"
        >
          Storage Method
        </Text>
        <Select
          selectedValue={
            storageMethods.length === 1 ? storageMethods[0].storageName : null
          }
          minWidth="200"
          placeholder="Choose a storage method"
          onValueChange={(itemValue) => {
            handleValueChange(itemValue);
          }}
          defaultValue={selectedStorage ? selectedStorage.storageName : null}
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
