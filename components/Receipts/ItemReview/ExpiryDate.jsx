import React, { useEffect, useState } from 'react';
import { Platform } from 'expo-modules-core';
import {
  Box, Text, Input, FormControl, Button,
} from 'native-base';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useFridgeContext } from '../../FridgeContext.jsx';

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
  console.log((moment(purchaseDate, 'DD-MM-YYYY').format('YYYY-MM-DD')));

  useEffect(() => {
    setExpiryDate(newExpiryDate);
    reviewItemsDispatch(editReviewItem(reviewItemId, EXPIRY_DATE, newExpiryDate));
  }, [purchaseDate, updatedShelfLifeDays]);

  return (
    <Box w="50%">
      {Platform.OS === 'web'
        ? (
          <FormControl isRequired>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              color="primary.800"
            >
              Expiry date
            </Text>
            <Input
              type="text"
              variant="outline"
              placeholder="Enter the expiry date"
              value={expiryDate}
              onChangeText={handleChangeExpiryDate}
            />
          </FormControl>
        )
        : (
          <FormControl isRequired>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              color="primary.800"
            >
              Expiry date
            </Text>
            <Button variant="subtle" onPress={showDate}>{moment(expiryDate, 'DD-MM-YYYY').format('DD MMM YYYY')}</Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              minimumDate={new Date(moment(purchaseDate, 'DD-MM-YYYY').format('YYYY-MM-DD'))}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </FormControl>
        )}
    </Box>
  );
}
