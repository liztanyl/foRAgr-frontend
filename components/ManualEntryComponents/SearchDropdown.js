import React from "react"

export default function SearchDropDown({filtered, setSelectedList, setSearchInput, setFilteredList}) {

  const handleSelect = (selectedItem) => {
    console.log(selectedItem)
    setSelectedList((prev)=>([...prev, selectedItem]));
    setSearchInput('');
    setFilteredList([]);
  }

  const filteredDisplay = filtered.slice(0,5).map((x) => <p key={x.id} onClick={() => handleSelect(x)}>{x.name}</p>)

  return (
    <>
    {filteredDisplay}
    </>
    )
}