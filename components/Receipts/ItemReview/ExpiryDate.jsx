import React, { useEffect, useState } from 'react';
import { Input, FormControl } from 'native-base';
import moment from 'moment';
import { useFridgeContext } from '../../FridgeContext';

const EXPIRY_DATE = 'expiryDate';

export default function ExpiryDate({
  index,
  purchaseDate,
  updatedShelfLifeDays,
}) {
  const newExpiryDate = moment(purchaseDate, 'DD-MM-YYYY')
    .add(updatedShelfLifeDays, 'days')
    .format('DD-MM-YYYY');

  const [expiryDate, setExpiryDate] = useState(newExpiryDate);

  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  const handleChangeExpiryDate = (date) => {
    setExpiryDate(date);
    reviewItemsDispatch(editReviewItem(index, EXPIRY_DATE, date));
  };

  useEffect(() => {
    setExpiryDate(newExpiryDate);
    reviewItemsDispatch(editReviewItem(index, EXPIRY_DATE, newExpiryDate));
  }, [purchaseDate, updatedShelfLifeDays]);

  return (
    <FormControl isRequired>
      <Input
        type="text"
        variant="outline"
        placeholder="Enter the expiry date"
        value={expiryDate}
        onChangeText={handleChangeExpiryDate}
      />
    </FormControl>
  );
}
