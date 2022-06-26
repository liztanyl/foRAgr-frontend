import React from 'react';
import { Box, Text } from 'native-base';

export default function displayToast(toast, message, colour) {
  console.log('🍞');

  toast.show({
    placement: 'bottom',
    render: () => (
      <Box bg={colour} px="4" py="3" rounded="sm" mb={3}>
        <Text color="white">
          {message}
        </Text>
      </Box>
    ),
  });
}
