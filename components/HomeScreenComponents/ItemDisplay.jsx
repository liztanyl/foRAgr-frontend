import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Box, Heading, Text, Badge, VStack, HStack, FlatList, Spacer,
} from 'native-base';
import { useFridgeContext } from '../FridgeContext';

export default function ItemDisplay({ currentStorage }) {
  const { fridgeItems } = useFridgeContext();
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (currentStorage === 'All') {
      setItems(fridgeItems);
    } else {
      const newItems = fridgeItems?.filter((item) => item.storage === currentStorage);
      setItems(newItems);
    }
  }, [currentStorage, fridgeItems]);

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        {currentStorage}
      </Heading>
      <FlatList
        data={items}
        renderItem={({
          item,
        }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                bold
                fontSize="md"
              >
                {item.name}
              </Text>
              <Spacer />
              <Badge alignSelf="center" colorScheme="warning" variant="solid">
                {`Expires ${moment(item.expiresOn).fromNow()}`}
              </Badge>
            </HStack>
            <VStack>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.category}
              </Text>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                Added:
                {' '}
                {moment(item.addedOn).fromNow()}
              </Text>
            </VStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}
