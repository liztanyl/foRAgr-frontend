import React, { useEffect, useState } from 'react';
import { Box, Select, Center } from 'native-base';

import { useFridgeContext } from '../../FridgeContext';

const CATEGORY = 'category';

export default function CategorySelector({
  index,
  categories,
  setSelectedCategory,
}) {
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  const handleValueChange = (itemValue) => {
    const selectedItem = categories.filter(
      (item) => item.categoryName == itemValue
    )[0];
    setSelectedCategory(selectedItem);
    reviewItemsDispatch(
      editReviewItem(index, CATEGORY, selectedItem.categoryName)
    );
  };

  useEffect(() => {
    if (categories.length == 1) {
      setSelectedCategory(categories[0]);
      reviewItemsDispatch(
        editReviewItem(index, CATEGORY, categories[0].categoryName)
      );
    }
  }, []);

  return (
    <Box w="3/4" maxW="300">
      <Select
        minWidth="200"
        placeholder="Choose a category"
        _selectedItem={{
          bg: 'teal.600',
        }}
        mt={1}
        onValueChange={(itemValue) => {
          handleValueChange(itemValue);
        }}
        defaultValue={
          categories.length == 1 ? categories[0].categoryName : null
        }
      >
        {categories.length == 1 ? (
          // only render the first category if only 1 category
          <Select.Item
            isDisabled
            label={categories[0].categoryName}
            value={categories[0].categoryName}
            key={categories[0].categoryName + categories[0].id}
          />
        ) : (
          // otherwise, render all categories
          categories.map((item, index) => {
            return (
              <Select.Item
                label={item.categoryName}
                value={item.categoryName}
                key={item.categoryName + index}
              />
            );
          })
        )}
      </Select>
    </Box>
  );
}
