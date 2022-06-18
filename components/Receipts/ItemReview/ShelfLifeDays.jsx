import React, { useEffect, useState } from 'react';
import { Input, FormControl } from 'native-base';

export default function ShelfLifeDays({ selectedStorage }) {
  const { shelfLifeDays } = selectedStorage;
  const [updatedShelfLifeDays, setUpdatedShelfLifeDays] =
    useState(shelfLifeDays);

  useEffect(() => {
    setUpdatedShelfLifeDays(shelfLifeDays);
  }, [selectedStorage]);

  const handleUpdatedShelfLifeDays = (itemValue) => {
    setUpdatedShelfLifeDays(itemValue);
    console.log(updatedShelfLifeDays);
  };
  return (
    <FormControl isRequired>
      <Input
        type="text"
        variant="outline"
        placeholder="Enter shelf life length in days"
        value={updatedShelfLifeDays}
        onChangeText={handleUpdatedShelfLifeDays}
      />
    </FormControl>
  );
}
