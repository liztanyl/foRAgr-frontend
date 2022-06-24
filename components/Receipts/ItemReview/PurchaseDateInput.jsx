import React, { useEffect, useState } from 'react';
import { Input, FormControl, Button } from 'native-base';
import moment from 'moment';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFridgeContext } from '../../FridgeContext.jsx';

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

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDate = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // when click confirm date picker
  const handleConfirm = (date) => {
    hideDatePicker();
    console.log(moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'));
    setPurchaseDate(moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'));
    reviewItemsDispatch(editReviewItem(reviewItemId, PURCHASE_DATE, purchaseDate));
  };

  useEffect(() => {
    reviewItemsDispatch(editReviewItem(reviewItemId, PURCHASE_DATE, purchaseDate));
  }, [purchaseDate]);

  return (
    <FormControl isRequired>
      {Platform.OS === 'web'
        ? (
          <Input
            type="text"
            variant="outline"
            placeholder="Enter the date of purchase"
            value={purchaseDate}
            onChangeText={handleChangePurchaseDate}
          />
        )
        : (
          <>
            <Button onPress={() => showDate()}>{purchaseDate}</Button>
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
