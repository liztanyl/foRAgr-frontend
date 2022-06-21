import React from 'react';

import {
  Alert, VStack, HStack, Text,
} from 'native-base';

export default function ExpiryAlert({ num }) {
  return (
    <Alert w="100%" status="warning">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="sm" color="coolGray.800">
              You have
              {' '}
              {num}
              {' '}
              items about to expire in the next 3 days.
            </Text>
          </HStack>
          {/* <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" color="coolGray.600" />}
          /> */}
        </HStack>
      </VStack>
    </Alert>
  );
}
