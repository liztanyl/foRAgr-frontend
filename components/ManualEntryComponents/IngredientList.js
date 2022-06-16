import React from "react"

export default function IngredientList({ selected, setSelectedList }) {


  const selectedDisplay = selected.map((x) => <p key={x.name} style={{fontWeight: "bold"}}>{x.name}</p>)

  return (
    <>
    {selectedDisplay}
    </>
  )
}