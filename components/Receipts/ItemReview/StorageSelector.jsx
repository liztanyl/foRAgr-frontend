import React, { useEffect, useState } from 'react';
import {
  Box, Select, Center, FormControl,
} from 'native-base';

import { allSameCategory } from './ItemForm.jsx';

export default function StorageSelector({
  selectedShelfLifeItem,
  shelfLifeItems,
}) {
  const [selectedStorage, setSelectedStorage] = useState('');

  useEffect(() => {
    console.log(selectedShelfLifeItem);
    console.log(shelfLifeItems);
    if (selectedShelfLifeItem) {
      setSelectedStorage(selectedShelfLifeItem.storageName);
    }
  }, [selectedShelfLifeItem]);
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
          defaultValue={selectedStorage || null}
        >
          {allSameCategory(shelfLifeItems)
					  ? shelfLifeItems.map((item, index) => (
  <Select.Item
    label={item.storageName}
    value={item.storageName}
    key={item.storageName + index}
  />
            ))
					  : selectedShelfLifeItem.storageName}
        </Select>
      </FormControl>
    </Box>
  );
}
