import React, { useEffect, useState } from 'react';
import {
  Box,
  Select,
  Center,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

import { useFridgeContext } from '../../FridgeContext';

const STORAGE_METHOD = 'storageMethod';

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
    if (storageMethods.length == 1) {
      setSelectedStorage(storageMethods[0]);
      console.log(storageMethods[0].storageName);
      reviewItemsDispatch(
        editReviewItem(index, STORAGE_METHOD, storageMethods[0].storageName)
      );
    }
  }, [selectedCategory]);

  const handleValueChange = (itemValue) => {
    const selectedStorage = storageMethods.filter(
      (item) => item.storageName == itemValue
    )[0];
    setSelectedStorage(selectedStorage);
    reviewItemsDispatch(
      editReviewItem(index, STORAGE_METHOD, selectedStorage.storageName)
    );
    console.log(selectedStorage);
  };

  return (
    <Box w="3/4" maxW="300">
      <FormControl isRequired isInvalid={!selectedStorage}>
        <Select
          selectedValue={
            storageMethods.length == 1 ? storageMethods[0].storageName : null
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
          {selectedCategory
            ? selectedCategory.storageMethods.map((storageMethod, index) => {
                return (
                  <Select.Item
                    label={storageMethod.storageName}
                    value={storageMethod.storageName}
                    key={storageMethod.storageName + index}
                  />
                );
              })
            : selectedShelfLifeItem.storageName}
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please select a storage method
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
}
