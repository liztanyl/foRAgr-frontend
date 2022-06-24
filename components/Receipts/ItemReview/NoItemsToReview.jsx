import React from 'react';
import {
  Text, Button, VStack, HStack,
} from 'native-base'; import {
  Ionicons,
} from '@expo/vector-icons';
import { View } from 'react-native';

export default function NoItemsToReview({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space="2xl" alignItems="center">
        <Text fontSize="lg">There are no items to review.</Text>
        <Button
          alignItems="center"
          size="lg"
          bg="highlight.400"
          _pressed={{ bgColor: 'secondary.400' }}
          startIcon={<Ionicons name="add" size={24} color="white" />}
          onPress={() => navigation.navigate('Manual Entry')}
        >
          Add items
        </Button>
        <Button
          size="lg"
          bg="primary.100"
          _pressed={{ bgColor: 'primary.200' }}
          startIcon={<Ionicons name="home" size={24} color="white" />}
          onPress={() => navigation.navigate('Home')}
        >
          Back to Home
        </Button>
      </VStack>
    </View>
  );
}
