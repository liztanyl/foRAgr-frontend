import React from 'react';
import { Box, Button, VStack } from 'native-base';
import { View } from 'react-native';

export default function NoItemsToReview({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems="center">
        <Box>There are no items to review.</Box>
        <Button
          size="sm"
          padding={10}
          colorScheme="primary"
          // rightIcon={<FontAwesome name="camera" size={24} color="white" />}
          onPress={() => navigation.navigate('Home')}
        >
          Back to Home
        </Button>
        <Button
          size="sm"
          padding={10}
          colorScheme="secondary"
          // rightIcon={
          //   <FontAwesome name="pencil-square-o" size={24} color="white" />
          // }
          onPress={() => navigation.goBack()}
        >
          Add more items
        </Button>
      </VStack>
    </View>
  );
}
