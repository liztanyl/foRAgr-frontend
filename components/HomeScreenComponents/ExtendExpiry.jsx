import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  View, Button,
} from 'native-base';
import { Platform } from 'react-native';
import WebExpiry from './WebExpiry.jsx';

export default function ExtendExpiry({ expiry }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDate = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    console.log(date);
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
        : <WebExpiry expiry={expiry} /> }
    </View>
  );
}
