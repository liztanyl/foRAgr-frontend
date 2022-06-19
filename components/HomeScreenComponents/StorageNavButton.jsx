import React from 'react';
import { Button } from 'native-base';

export default function StorageNavButton({ storageMethod, currentStorage, setCurrentStorage }) {
  return (
    <Button
      isDisabled={currentStorage === storageMethod}
      onPress={() => setCurrentStorage(storageMethod)}
    >
      {storageMethod}
    </Button>
  );
}
