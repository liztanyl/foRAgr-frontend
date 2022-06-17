import React, { useEffect, useState } from 'react';
import { Box, Select, Center } from 'native-base';

import { allSameCategory } from './ItemForm.jsx';

export default function CategorySelector({
  shelfLifeItems,
  setSelectedShelfLifeItem,
}) {
  const handleValueChange = (itemValue) => {
    const selectedItem = shelfLifeItems.filter(
      (item) => item.categoryName == itemValue,
    )[0];
    setSelectedShelfLifeItem(selectedItem);
    console.log(selectedItem);
  };

  useEffect(() => {
    if (allSameCategory(shelfLifeItems)) {
      setSelectedShelfLifeItem(shelfLifeItems[0]);
    }
  }, []);

  return (
    <Box w="3/4" maxW="300">
      <Select
        minWidth="200"
        placeholder="Choose a category"
        _selectedItem={{ bg: 'teal.600' }}
        mt={1}
        onValueChange={(itemValue) => { handleValueChange(itemValue); }}
        defaultValue={
					shelfLifeItems.length == 1 || allSameCategory(shelfLifeItems)
					  ? shelfLifeItems[0].categoryName
					  : null
				}
      >
        {allSameCategory(shelfLifeItems) ? (
        // only render the first category if all categories are same
          <Select.Item
            isDisabled
            label={shelfLifeItems[0].categoryName}
            value={shelfLifeItems[0].categoryName}
            key={shelfLifeItems[0].categoryName + shelfLifeItems[0].id}
          />
        ) : (
        // otherwise, render all categories
				  shelfLifeItems.map((item, index) => (
  <Select.Item
    label={item.categoryName}
    value={item.categoryName}
    key={item.categoryName + index}
  />
          ))
        )}
      </Select>
    </Box>
  );
}
