import React from 'react';
import {
  Text, Button, VStack,
} from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function NoItemsToReview({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space="2xl" alignItems="stretch">
        <Text fontSize="lg">There are no items to review.</Text>
        <Button
          alignItems="center"
          size="lg"
          colorScheme="secondary"
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
    </View>
  );
}
