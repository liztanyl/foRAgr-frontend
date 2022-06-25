import {
  Box, HStack, IconButton, Icon, Button, Text, ScrollView,
} from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useFridgeContext } from '../FridgeContext.jsx';
import NoData from './NoData.jsx';

function ParsedReceipt({ route, navigation }) {
  const { reviewIdsDispatch, dispatchHelpers: { addReviewIds } } = useFridgeContext();
  const { parsedData } = route.params;

  const [foodItemsPhoto, setFoodPhotoItems] = useState(parsedData.data);
  const [loading, setLoading] = useState(false);
  console.log(foodItemsPhoto, 'food items');
  const removeItem = (item) => {
    const remainingItems = foodItemsPhoto.filter((food) => item !== food.match[0].itemName);
    setFoodPhotoItems(remainingItems);
  };

  const addToReviewItems = () => {
    setLoading(true);
    const foodIds = foodItemsPhoto.map((food) => food.dataId);
    console.log(foodIds);
    reviewIdsDispatch(addReviewIds(foodIds));
    navigation.popToTop();
    navigation.navigate('Review Items');
  };

  return (
    <View style={{
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    }}
    >
      {(foodItemsPhoto.length === 0) && <NoData navigation={navigation} />}

      {foodItemsPhoto.length > 0 && (
        <ScrollView width="100%" p={3}>

          {foodItemsPhoto.map((data) => (
            <HStack
              key={uuidv4()}
              space={2}
              my={2}
              py={2}
              px={5}
              borderRadius={5}
              justifyContent="space-between"
              alignItems="center"
              bgColor="secondary.200"
            >
              <Text flex={5}>{data.parsedName.toUpperCase()}</Text>
              <Text flex={5} fontWeight="bold">{data.match[0].itemName}</Text>
              <Box flex={1}>
                <IconButton
                  colorScheme="danger"
                  icon={<Icon as={MaterialIcons} name="cancel" size={5} />}
                  onPress={() => removeItem(data.match[0].itemName)}
                />
              </Box>
            </HStack>
          ))}

          <HStack marginY={10} justifyContent="space-between">
            <Button
              startIcon={
                <Icon as={MaterialIcons} name="camera-alt" size="md" color="white" />
              }
              onPress={() => {
                navigation.popToTop();
                navigation.push('Camera Mode');
              }}
            >
              Take Again
            </Button>
            <Button
              colorScheme="tertiary"
              endIcon={
                <MaterialCommunityIcons name="chevron-right-circle" size={24} color="white" />
              }
              onPress={addToReviewItems}
              isLoading={loading}
              isLoadingText="Loading"
              spinnerPlacement="end"
            >
              Review Items
            </Button>
          </HStack>
        </ScrollView>
      )}
    </View>
  );
}

export default ParsedReceipt;
