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

  const filteredDisplay = filtered.slice(0, 5).map((x) => <Button minW="200" key={x.id} onPress={() => handleSelect(x)}>{x.name}</Button>);

  const nothingFoundDisplay = <Button minW="200" isDisabled>No food item found</Button>;

  return (
    <>
      {filteredDisplay}
      {filteredDisplay.length === 0 && nothingFoundDisplay}
    </>
  );
}
