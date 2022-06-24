import React, { useEffect, useState } from 'react';
import { Platform } from 'expo-modules-core';
import { Input, FormControl, Button } from 'native-base';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFridgeContext } from '../../FridgeContext';

const EXPIRY_DATE = 'expiryDate';

export default function ExpiryDate({
  reviewItemId,
  purchaseDate,
  updatedShelfLifeDays,
  expiryDate,
  setExpiryDate,
  newExpiryDate,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  const showDate = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // when click confirm date picker
  const handleConfirm = (date) => {
    hideDatePicker();
    setExpiryDate(moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'));
    reviewItemsDispatch(editReviewItem(reviewItemId, EXPIRY_DATE, date));
  };

  const handleChangeExpiryDate = (date) => {
    setExpiryDate(date);
    reviewItemsDispatch(editReviewItem(reviewItemId, EXPIRY_DATE, date));
  };

  useEffect(() => {
    setExpiryDate(newExpiryDate);
    reviewItemsDispatch(editReviewItem(reviewItemId, EXPIRY_DATE, newExpiryDate));
  }, [purchaseDate, updatedShelfLifeDays]);

  return (
    <FormControl isRequired>
      {Platform.OS === 'web' ? (
        <Input
          type="text"
          variant="outline"
          placeholder="Enter the expiry date"
          value={expiryDate}
          onChangeText={handleChangeExpiryDate}
        />
      )
        : (
          <>
            <Button onPress={() => showDate()}>{expiryDate}</Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </>
        )}
    </FormControl>
  );
}
