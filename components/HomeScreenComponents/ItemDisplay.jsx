import React, { useState, useEffect } from 'react';
import { Text, Spinner, Center } from 'native-base';
import { useFridgeContext } from '../FridgeContext.jsx';
import { sortItems } from './helpers.js';
import ItemList from './ItemList.jsx';

export default function ItemDisplay({
  currentStorage, sortBy, isLoading, setIsLoading,
}) {
  const { fridgeItems } = useFridgeContext();
  const [items, setItems] = useState(null);

  useEffect(() => {
    let newItems = fridgeItems && [...fridgeItems];
    if (currentStorage !== 'All') {
      newItems = newItems?.filter((item) => item.storageMethod === currentStorage);
    }
    newItems.sort((a, b) => sortItems(a, b, 'expiry', 'asc'));
    setItems(newItems);
  }, [currentStorage, fridgeItems]);

  useEffect(() => {
    setIsLoading(false);
  }, [sortBy, items]);

  return (
    <>
      {isLoading && <Spinner size="lg" margin={10} />}
      {(!isLoading && items && items.length > 0)
      && <ItemList items={items} setItems={setItems} sortBy={sortBy} />}
      {(!isLoading && (!items || items.length === 0))
      && (
      <Center flex={1} alignItems="center" justifyContent="center">
        <Text>There's nothing here! Add some items first.</Text>
      </Center>
      )}
    </>
  );
}
