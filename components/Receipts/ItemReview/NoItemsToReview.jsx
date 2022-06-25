import React from 'react';
import {
  Text, Button, VStack, Center,
} from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function NoItemsToReview({ navigation }) {
  return (
    <Center height="100%" width="100%">
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text fontSize="xl">There are no items to review.</Text>
      </View>
      <VStack flex={1} space={5}>
        <Button
          alignItems="center"
          size="lg"
          colorScheme="tertiary"
          _text={{ fontSize: 'lg' }}
          leftIcon={<MaterialIcons name="add-circle" size={24} color="white" />}
          onPress={() => navigation.popToTop()}
        >
          Add more items
        </Button>
        <Button
          size="lg"
          _text={{ fontSize: 'lg' }}
          startIcon={<MaterialCommunityIcons name="fridge" size={24} color="white" />}
          onPress={() => {
            navigation.popToTop();
            navigation.navigate('Home');
          }}
        >
          Back to Home
        </Button>
      </VStack>
    </Center>
  );
}
