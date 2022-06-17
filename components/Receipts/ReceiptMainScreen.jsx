import { VStack, Button } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function ReciptMainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems="center">
        <Button
          size="lg"
          padding={10}
          colorScheme="primary"
          rightIcon={<FontAwesome name="camera" size={24} color="white" />}
          onPress={() => navigation.navigate('Camera Mode')}
        >
          Camera Mode
        </Button>
        <Button
          size="lg"
          padding={10}
          colorScheme="secondary"
          rightIcon={
            <FontAwesome name="pencil-square-o" size={24} color="white" />
          }
          onPress={() => navigation.navigate('Manual Entry')}
        >
          Manual Entry
        </Button>
      </VStack>
    </View>
  );
}

export default ReciptMainScreen;
