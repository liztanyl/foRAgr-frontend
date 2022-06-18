import React, { useEffect, useState } from 'react';
import { Input, FormControl } from 'native-base';

export default function ExpiryDate() {
  const [expiryDate, setExpiryDate] = useState();

  const handleChangeExpiryDate = (date) => {
    setExpiryDate(date);
  };

  return (
    <FormControl isRequired>
      <Input
        type="text"
        variant="outline"
        placeholder="Enter the expiry date"
        value={expiryDate}
        onChangeText={handleChangeExpiryDate}
      />
    </FormControl>
  );
}
