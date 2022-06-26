/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import {
  Popover, Button, Text, VStack, Icon, useToast,
} from 'native-base';
import axios from 'axios';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext.jsx';
import { useUserContext } from '../UserContext.jsx';
import cancelNotification from '../NotificationComponent/cancelNotification.js';
import displayToast from '../displayToast.jsx';

export default function RemoveItemButton({ itemId, itemName }) {
  const {
    fridgeDispatch,
    dispatchHelpers: { removeFridgeItem },
  } = useFridgeContext();
  const { jwtToken } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  const handleDelete = () => {
    setIsDeleting(true);

    const dataToBackend = { itemId, userToken: jwtToken };
    axios
      .post(`${BACKEND_URL}/fridgeItems/destroy`, dataToBackend)
      .then((response) => {
        if (Platform.OS !== 'web') cancelNotification(response.data);
        fridgeDispatch(removeFridgeItem(itemId));
        displayToast(toast, `Removed ${itemName.toUpperCase()} from your fridge`, 'secondary.600');
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
          size="sm"
          py="1"
          my="2"
          colorScheme="secondary"
          variant="outline"
          startIcon={<Icon as={MaterialIcons} name="check" />}
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
                onPress={() => { setIsOpen(false); setIsDeleting(false); }}
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
