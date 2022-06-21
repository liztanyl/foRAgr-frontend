/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Popover, Button } from 'native-base';
import axios from 'axios';
import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext.jsx';
import cancelNotification from '../NotificationComponent/cancelNotification.js';

export default function RemoveItemButton({ itemId }) {
  const { fridgeDispatch, dispatchHelpers: { removeFridgeItem } } = useFridgeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    axios.post(`${BACKEND_URL}/fridgeItems/destroy/${itemId}`)
      .then(async (notificationIdentifier) => {
        await cancelNotification(notificationIdentifier);
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
          w="25%"
          variant="outline"
          onPress={() => setIsOpen(true)}
        >
          Remove
        </Button>
      )}
    >
      <Popover.Content width="48">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>
          Are you sure?
        </Popover.Header>
        <Popover.Body>
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
              Delete
            </Button>
          </Button.Group>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
