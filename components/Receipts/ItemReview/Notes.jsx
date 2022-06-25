import React, { useEffect, useState } from 'react';
import {
  Text, Input, FormControl, Button,
} from 'native-base';
import { useFridgeContext } from '../../FridgeContext';

const NOTES = 'notes';

export default function Notes({ item, reviewItemId }) {
  const [notesInput, handleNotesInput] = useState('');
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  const handleInput = (text) => {
    handleNotesInput(text);
    reviewItemsDispatch(editReviewItem(reviewItemId, NOTES, text));
  };

  useEffect(() => {
    if (item.notes) {
      handleNotesInput(item.notes);
      reviewItemsDispatch(editReviewItem(reviewItemId, NOTES, notesInput));
    }
  }, []);

  return (
    <FormControl isRequired>
      <Text fontSize="xs" textTransform="uppercase" color="primary.800">
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
