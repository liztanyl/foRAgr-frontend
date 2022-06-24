import React, { useEffect, useState } from 'react';
import {
  Text, Input, FormControl, Button,
} from 'native-base';
import { useFridgeContext } from '../../FridgeContext';

const NOTES = 'notes';
export default function Notes({ reviewItemId }) {
  const [notesInput, handleNotesInput] = useState('');
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  const handleInput = (text) => {
    handleNotesInput(text);
  };
  useEffect(() => {
    reviewItemsDispatch(editReviewItem(reviewItemId, NOTES, notesInput));
  }, [notesInput]);

  return (
    <FormControl isRequired>
      <Text
        fontSize="xs"
        textTransform="uppercase"
        color="primary.800"
      >
        Remarks
      </Text>
      <Input
        type="text"
        variant="outline"
        placeholder="Any remarks"
        value={notesInput}
        onChangeText={handleInput}
      />
    </FormControl>
  );
}
