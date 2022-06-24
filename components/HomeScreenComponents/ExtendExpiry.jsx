import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  View, Button,
} from 'native-base';
import { Platform } from 'react-native';
import axios from 'axios';
import WebExpiry from './WebExpiry.jsx';
import { useUserContext } from '../UserContext.jsx';
import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext.jsx';

export default function ExtendExpiry({ expiry, itemId }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { jwtToken } = useUserContext();
  const {
    fridgeDispatch,
    dispatchHelpers: { editFridgeItem },
  } = useFridgeContext();

  const showDate = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateChanged) => {
    const expiryDate = 'expiryDate';
    console.log(dateChanged);
    hideDatePicker();
    const dataToBackend = { itemId, userToken: jwtToken, dateChanged };
    axios
      .post(`${BACKEND_URL}/extendShelfLife`, dataToBackend)
      .then((response) => fridgeDispatch(editFridgeItem(itemId, expiryDate, dateChanged)))
      .catch((error) => console.log(error));
  };

  return (
    <View>
      {Platform.OS !== 'web' ? (
        <>
          <Button onPress={showDate} w="40%" size="sm">Extend expiry</Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </>
      )
        : <WebExpiry itemId={itemId} expiry={expiry} /> }
    </View>
  );
}
