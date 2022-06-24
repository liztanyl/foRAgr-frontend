import {
  Box, HStack, IconButton, Icon, Button,
  Alert, VStack, Text, Center, ScrollView,
} from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFridgeContext } from '../FridgeContext.jsx';

function SuccessfulAlert() {
  return (
    <Center>
      <Alert w="90%" maxW="400" status="info" colorScheme="info">
        <VStack space={2} flexShrink={1}>
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                Successfully added to virtual fridge
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </Center>
  );
}

function ParsedReceipt({ route, navigation }) {
  const { reviewIdsDispatch, dispatchHelpers: { addReviewIds } } = useFridgeContext();
  const { parsedData } = route.params;

  const [foodItemsPhoto, setFoodPhotoItems] = useState(parsedData.data);
  const [show, setShow] = useState(false);
  console.log(foodItemsPhoto, 'food items');
  const removeItem = (item) => {
    const remainingItems = foodItemsPhoto.filter((food) => item !== food.match[0].itemName);
    setFoodPhotoItems(remainingItems);
  };

  const saveToVirtualFridge = () => {
    setShow(true);
    const foodIds = foodItemsPhoto.map((food) => food.dataId);
    console.log(foodIds);
    reviewIdsDispatch(addReviewIds(foodIds));
  };

  return (
    <View
      style={{
        height: '100%', alignItems: 'center', justifyContent: 'center', padding: 10,
      }}
    >
      {(foodItemsPhoto.length === 0)

      && (
      <HStack>
        <Button onPress={() => {
          navigation.popToTop();
          navigation.push('Manual Entry');
        }}
        >
          Manual Entry
        </Button>
        <Button onPress={() => {
          navigation.popToTop();
          navigation.push('Camera Mode');
        }}
        >
          Take Again

        </Button>

      </HStack>
      )}
      <ScrollView>
        {show && <SuccessfulAlert />}
        {(foodItemsPhoto.length !== 0)
        && <Box>Possible Food Items detected: </Box>}
        {foodItemsPhoto.length !== 0
      && foodItemsPhoto.map((data) => (
        <Box>
          <HStack space={2} my="2" justifyContent="space-between">
            <Box w="30%">{data.parsedName.toUpperCase()}</Box>
            <Box w="50%">{data.match[0].itemName}</Box>
            <Box>
              <IconButton
                icon={<Icon as={MaterialIcons} name="cancel" size={5} />}
                borderRadius="full"
                onPress={() => removeItem(data.match[0].itemName)}
              />
            </Box>
          </HStack>
        </Box>
      ))}
        {(!show && foodItemsPhoto.length > 0)
      && (
      <HStack space={2}>
        <Button
          mb={30}
          onPress={() => {
            saveToVirtualFridge();
            navigation.navigate('Review Items');
          }}
        >
          Add to virtual fridge
        </Button>
        <Button onPress={() => {
          navigation.popToTop();
          navigation.push('Camera Mode');
        }}
        >
          Take Again

        </Button>
      </HStack>
      )}
      </ScrollView>
    </View>
  );
}

export default ParsedReceipt;
