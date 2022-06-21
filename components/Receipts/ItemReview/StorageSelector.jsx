import React, { useEffect } from 'react';
import {
  Box,
  Select,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

import { useFridgeContext } from '../../FridgeContext.jsx';

const STORAGE_METHOD = 'storageMethod';
const SHELF_LIFE_ITEM_ID = 'shelfLifeItemId';

export default function StorageSelector({
  index,
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
      reviewItemsDispatch(editReviewItem(index, STORAGE_METHOD, storage.storageName));
      reviewItemsDispatch(editReviewItem(index, SHELF_LIFE_ITEM_ID, storage.shelfLifeItemId));
    }
  }, [selectedCategory]);

  const handleValueChange = (itemValue) => {
    const chosenStorage = storageMethods.filter((item) => item.storageName === itemValue)[0];
    setSelectedStorage(chosenStorage);
    reviewItemsDispatch(editReviewItem(index, STORAGE_METHOD, chosenStorage.storageName));
    reviewItemsDispatch(editReviewItem(index, SHELF_LIFE_ITEM_ID, chosenStorage.shelfLifeItemId));
    console.log(selectedStorage);
  };

  return (
    <Box w="3/4" maxW="300">
      <FormControl isRequired isInvalid={!selectedStorage}>
        <Select
          selectedValue={
            storageMethods.length === 1 ? storageMethods[0].storageName : null
          }
          minWidth="200"
          placeholder="Choose a storage method"
          _selectedItem={{
            bg: 'teal.600',
          }}
          mt={1}
          onValueChange={(itemValue) => {
            handleValueChange(itemValue);
          }}
          defaultValue={selectedStorage ? selectedStorage.storageName : null}
        >
          {selectedCategory.storageMethods.map((storageMethod, i) => (
            <Select.Item
              label={storageMethod.storageName}
              value={storageMethod.storageName}
              key={`storage-method-${storageMethod.storageName + i}`}
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
