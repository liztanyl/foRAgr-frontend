import React, { useEffect, useState } from 'react';
import { Input, FormControl, Button } from 'native-base';
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
      <Input
        type="text"
        variant="outline"
        placeholder="Remarks"
        value={notesInput}
        onChangeText={handleInput}
      />
    </FormControl>
  );
}
