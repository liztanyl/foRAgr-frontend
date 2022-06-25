import React, { useEffect, useState } from 'react';
import {
  Box,
  Select,
  FormControl,
  Text,
  WarningOutlineIcon,
} from 'native-base';

import { useFridgeContext } from '../../FridgeContext.jsx';

const CATEGORY = 'category';

export default function CategorySelector({
  item,
  reviewItemId,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  useEffect(() => {
    if (item.category) {
      setSelectedCategory(categories.filter((cat) => cat.categoryName === item.category)[0]);
    } else if (categories.length === 1) {
      setSelectedCategory(categories[0]);
      reviewItemsDispatch(editReviewItem(reviewItemId, CATEGORY, categories[0].categoryName));
    }
  }, []);

  const handleValueChange = (itemValue) => {
    const selectedItem = categories.filter((item) => item.categoryName === itemValue)[0];
    setSelectedCategory(selectedItem);
    reviewItemsDispatch(editReviewItem(reviewItemId, CATEGORY, selectedItem.categoryName));
  };

  const handleDefaultValue = () => {
    if (categories.length === 1) {
      return categories[0].categoryName;
    }
    if (item.category) {
      return item.category;
    }
    return null;
  };

  return (
    <Box w="75%">
      <FormControl isRequired isInvalid={!selectedCategory && !item.category}>
        <Text fontSize="xs" textTransform="uppercase" color="primary.800">
          Category
        </Text>
        <Select
          minWidth="200"
          placeholder="Choose a category"
          onValueChange={(itemValue) => {
            handleValueChange(itemValue);
          }}
          defaultValue={handleDefaultValue}
        >
          {categories.length === 1 ? (
            // only render the first category if only 1 category
            <Select.Item
              isDisabled
              label={categories[0].categoryName}
              value={categories[0].categoryName}
              key={categories[0].categoryName + categories[0].id}
            />
          ) : (
            // otherwise, render all categories
            categories.map((item) => (
              <Select.Item
                label={item.categoryName}
                value={item.categoryName}
                key={reviewItemId + item.categoryName}
              />
            ))
          )}
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please select a category
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
}
