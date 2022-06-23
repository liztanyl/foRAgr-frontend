import React, { useEffect, useState } from 'react';
import { Input, FormControl } from 'native-base';
import moment from 'moment';
import { useFridgeContext } from '../../FridgeContext.jsx';
// import { Platform } from 'react-native';
// import { Picker } from 'react-native-web';
// import DateTimePicker from '@react-native-community/datetimepicker';

const PURCHASE_DATE = 'purchaseDate';

export default function PurchaseDateInput({
  reviewItemId,
  purchaseDate,
  setPurchaseDate,
}) {
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  const handleChangePurchaseDate = (date) => {
    setPurchaseDate(date);
    reviewItemsDispatch(editReviewItem(reviewItemId, PURCHASE_DATE, date));
  };

  useEffect(() => {
    reviewItemsDispatch(editReviewItem(reviewItemId, PURCHASE_DATE, purchaseDate));
  }, [purchaseDate]);

  return (
    <FormControl isRequired>
      <Input
        type="text"
        variant="outline"
        placeholder="Enter the date of purchase"
        value={purchaseDate}
        onChangeText={handleChangePurchaseDate}
      />
      {/* ISSUES WITH INSTALLING REACT NATIVE COMMUNITY DATE PICKER PACKAGES ON EXPO */}
      {/* {Platform.OS === 'android' && (
        <DateTimePicker
          // date={purchaseDate}
          // purchaseDate={purchaseDate}
          display="calendar"
          mode="date"
        />
      )} */}
      {/* {Platform.OS === 'web' && <Picker />} */}
    </FormControl>
  );
}
