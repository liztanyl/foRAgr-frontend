import React from 'react';
import {
  Alert, HStack, Text,
} from 'native-base';

export default function displayToast(toast, message, status) {
  console.log('🍞');

  toast.show({
    placement: 'bottom',
    render: () => (
      <Alert status={status} variant="left-accent" mb={5}>
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <Alert.Icon />
          <Text fontSize="xs" textTransform="uppercase">{message}</Text>
        </HStack>
      </Alert>
    ),
  });
}
