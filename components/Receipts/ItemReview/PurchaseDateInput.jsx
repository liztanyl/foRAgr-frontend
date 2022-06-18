import React, { useEffect, useState } from 'react';
import { Input, FormControl } from 'native-base';

export default function PurchaseDateInput() {
  const [purchaseDate, setPurchaseDate] = useState(new Date());

  const handleChangePurchaseDate = (date) => {
    setPurchaseDate(date);
  };

  return (
    <FormControl isRequired>
      <Input
        type="text"
        variant="outline"
        placeholder="Enter the date of purchase"
        value={purchaseDate}
        onChangeText={handleChangePurchaseDate}
      />
    </FormControl>
  );
}
