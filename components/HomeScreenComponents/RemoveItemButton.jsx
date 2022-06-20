/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Popover, Button } from 'native-base';

export default function RemoveItemButton() {
  const [isOpen, setIsOpen] = useState(false);
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
              onPress={() => setIsOpen(!isOpen)} // TODO: update with Delete route later
            >
              Delete

            </Button>
          </Button.Group>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
