import React from 'react';
import { Button } from 'native-base';

export default function SearchDropDown({
  filtered, setSelectedList, setSearchInput, setFilteredList, setSearchStatus,
}) {
  const handleSelect = (selectedItem) => {
    console.log(selectedItem);
    setSelectedList((prev) => ([...prev, selectedItem]));
    setSearchInput('');
    setFilteredList([]);
    setSearchStatus(false);
  };

  const filteredDisplay = filtered.slice(0, 5).map((x) => (
    <Button
      key={x.id}
      onPress={() => handleSelect(x)}
      width="100%"
      mb={1}
      colorScheme="primary"
      variant="solid"
    >
      {x.name}
    </Button>
  ));

  const nothingFoundDisplay = (
    <Button
      width="100%"
      colorScheme="primary"
      variant="solid"
      isDisabled
    >
      No food item found
    </Button>
  );

  return (
    <>
      {filteredDisplay}
      {filteredDisplay.length === 0 && nothingFoundDisplay}
    </>
  );
}
