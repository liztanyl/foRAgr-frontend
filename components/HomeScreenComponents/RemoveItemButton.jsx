/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Popover, Button, Text, VStack } from 'native-base';
import axios from 'axios';
import { Platform } from 'react-native';

import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext.jsx';
import { useUserContext } from '../UserContext.jsx';
import cancelNotification from '../NotificationComponent/cancelNotification.js';

export default function RemoveItemButton({ itemId }) {
  const {
    fridgeDispatch,
    dispatchHelpers: { removeFridgeItem },
  } = useFridgeContext();
  const { jwtToken } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    const dataToBackend = { itemId, userToken: jwtToken };
    axios
      .post(`${BACKEND_URL}/fridgeItems/destroy`, dataToBackend)
      .then((response) => {
        if (Platform.OS !== 'web') cancelNotification(response.data);
        fridgeDispatch(removeFridgeItem(itemId));
        setIsOpen(!isOpen);
      });
  };

  return (
    <Popover
      placement="right"
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          colorScheme="danger"
          size="sm"
          py="1"
          my="2"
          w="40%"
          variant="outline"
          onPress={() => setIsOpen(true)}
        >
          Mark as Consumed
        </Button>
      )}
    >
      <Popover.Content width="48">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>Confirmation</Popover.Header>
        <Popover.Body>
          <VStack space={4}>
            <Text>Are you sure you want to remove this item?</Text>
            <Button.Group space={2} justifyContent="space-between">
              <Button
                size="sm"
                colorScheme="coolGray"
                variant="outline"
                onPress={() => setIsOpen(!isOpen)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                colorScheme="danger"
                onPress={handleDelete}
                isLoading={isDeleting}
              >
                Remove
              </Button>
            </Button.Group>
          </VStack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
