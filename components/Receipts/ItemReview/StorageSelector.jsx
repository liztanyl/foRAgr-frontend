import React, { useEffect, useState } from 'react';
import { Box, Select, Center, FormControl } from 'native-base';

// import { allSameCategory } from './ItemForm';

export default function StorageSelector({
  categories,
  selectedCategory,
  selectedStorage,
  setSelectedStorage,
}) {
  const { storageMethods } = selectedCategory;

  useEffect(() => {
    if (storageMethods.length == 1) {
      setSelectedStorage(storageMethods[0]);
    }
  }, [selectedCategory]);

  const handleValueChange = (itemValue) => {
    const selectedStorage = storageMethods.filter(
      (item) => item.storageName == itemValue
    )[0];
    setSelectedStorage(selectedStorage);
    console.log(selectedStorage);
  };

  return (
    <Box w="3/4" maxW="300">
      <FormControl isRequired>
        <Select
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
      </FormControl>
    </Box>
  );
}
