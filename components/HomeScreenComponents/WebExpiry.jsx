import React, { useState, useRef } from 'react';
import {
  Popover, Button, Input, FormControl, Box, Text,
} from 'native-base';
import moment from 'moment';
import axios from 'axios';

export default function WebExpiry({ expiry }) {
  const [expiryDays, extendExpiry] = useState('');
  const initialFocusRef = useRef(null);
  console.log(expiry, 'expiry');
  const [dateChanged, changeDate] = useState(moment(expiry));

  const handleExtendedDays = (e) => {
    const processedValue = Number(e.target.value);
    console.log(processedValue);
    if (processedValue) {
      extendExpiry(processedValue);
      const extendedDate = dateChanged.add(processedValue, 'days');
      changeDate(extendedDate);
    }
    else if (e.target.value === '') {
      extendExpiry('');
    }
  };

  const handleSave = () => {
    axios.post('/extendShelfLife');
  };
  return (
    <Box h="60%" w="100%" alignItems="start">
      <Popover
        initialFocusRef={initialFocusRef}
        trigger={(triggerProps) => <Button {...triggerProps}>Extend expiry</Button>}
      >
        <Popover.Content width="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          {
          /* @ts-ignore */
        }
          <Popover.Header>Extend expiry</Popover.Header>
          <Popover.Body>
            <FormControl mt="3">
              <FormControl.Label _text={{
                fontSize: 'xs',
                fontWeight: 'medium',
              }}
              >
                Days
              </FormControl.Label>
              <Input rounded="sm" fontSize="xs" onChange={handleExtendedDays} value={expiryDays} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label _text={{
                fontSize: 'xs',
                fontWeight: 'medium',
              }}
              >
                Expiry date
              </FormControl.Label>
              <Text>{dateChanged.format('DD MM YYYY')}</Text>
            </FormControl>
          </Popover.Body>
          <Popover.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" variant="ghost">
                Cancel
              </Button>
              <Button onPress={handleSave}>Save</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
}
