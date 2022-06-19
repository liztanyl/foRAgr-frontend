import React, { useEffect, useState } from 'react';
import { Input, FormControl } from 'native-base';
import { useFridgeContext } from '../../FridgeContext';

const SHELF_LIFE_DAYS = 'shelfLifeDays';

export default function ShelfLifeDays({
  index,
  selectedStorage,
  updatedShelfLifeDays,
  setUpdatedShelfLifeDays,
}) {
  const { shelfLifeDays } = selectedStorage;

  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  useEffect(() => {
    setUpdatedShelfLifeDays(shelfLifeDays);
    reviewItemsDispatch(editReviewItem(index, SHELF_LIFE_DAYS, shelfLifeDays));
  }, [selectedStorage]);

  const handleUpdatedShelfLifeDays = (itemValue) => {
    if (itemValue.match(/^[0-9]+$/)) {
      setUpdatedShelfLifeDays(itemValue);
      reviewItemsDispatch(
        editReviewItem(index, SHELF_LIFE_DAYS, Number(itemValue))
      );
    } else if (!itemValue) {
      setUpdatedShelfLifeDays(null);
      reviewItemsDispatch(editReviewItem(index, SHELF_LIFE_DAYS, null));
    }
    console.log(updatedShelfLifeDays);
  };
  return (
    <FormControl isRequired>
      <Input
        type="text"
        variant="outline"
        placeholder="Enter shelf life length in days"
        value={updatedShelfLifeDays}
        onChangeText={handleUpdatedShelfLifeDays}
      />
    </FormControl>
  );
}
