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
<<<<<<< HEAD
      {!isLoading && (
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="3"
          >
            <HStack space={3} justifyContent="space-between">
              <Text color="coolGray.800" bold fontSize="md" textTransform="capitalize">
                {item.name}
              </Text>
              <Spacer />
              <ExpiryDateBadge expiryDate={item.expiryDate} />
            </HStack>
            <VStack>
              <Text color="coolGray.800" alignSelf="flex-start">
                {item.category}
              </Text>
              <Text
                color="coolGray.800"
                alignSelf="flex-start"
                textTransform="capitalize"
              >
                Added:
                {' '}
                {setDays(item.purchaseDate)}
              </Text>
              {item.notes !== ''
              && (
                <Text>
                  Remarks:
                  {' '}
                  {item.notes}
                </Text>
              )}
            </VStack>
            <HStack space={3}>
              <RemoveItemButton itemId={item.id} itemName={item.name} />
              {(moment(item.expiryDate).diff(new Date(), 'days') < 4) && <ExtendExpiry expiry={item.expiryDate} itemId={item.id} /> }
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
=======
      {(!isLoading && items && items.length > 0)
      && <ItemList items={items} setItems={setItems} sortBy={sortBy} />}
      {(!isLoading && (!items || items.length === 0))
      && (
      <Center flex={1} alignItems="center" justifyContent="center">
        <Text>There's nothing here! Add some items first.</Text>
      </Center>
>>>>>>> main
      )}
    </>
  );
}
