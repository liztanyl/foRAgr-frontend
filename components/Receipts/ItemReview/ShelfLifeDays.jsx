import React, { useEffect } from 'react';
import { Input, FormControl } from 'native-base';
import { useFridgeContext } from '../../FridgeContext.jsx';

const SHELF_LIFE_DAYS = 'shelfLifeDays';

export default function ShelfLifeDays({
  reviewItemId,
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
    reviewItemsDispatch(editReviewItem(reviewItemId,
      SHELF_LIFE_DAYS,
      shelfLifeDays));
  }, [selectedStorage]);

  const handleUpdatedShelfLifeDays = (itemValue) => {
    if (itemValue.match(/^[0-9]+$/)) {
      setUpdatedShelfLifeDays(Number(itemValue));
      reviewItemsDispatch(editReviewItem(reviewItemId,
        SHELF_LIFE_DAYS,
        Number(itemValue)));
    } else if (!itemValue) {
      setUpdatedShelfLifeDays(null);
      reviewItemsDispatch(editReviewItem(reviewItemId, SHELF_LIFE_DAYS, 0));
    }
    console.log(updatedShelfLifeDays);
  };
  return (
    <FormControl isRequired>
      <Input
        type="text"
        variant="outline"
        placeholder="Enter shelf life length in days"
        value={updatedShelfLifeDays?.toString()}
        onChangeText={handleUpdatedShelfLifeDays}
      />
    </FormControl>
  );
}
