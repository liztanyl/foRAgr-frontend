import { VStack, Button } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ReciptMainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems="stretch">
        <Button
          size="lg"
          padding={10}
          leftIcon={<MaterialIcons name="camera-alt" size={24} color="white" />}
          onPress={() => navigation.navigate('Camera Mode')}
        >
          Camera Mode
        </Button>
        <Button
          size="lg"
          padding={10}
          colorScheme="secondary"
          leftIcon={
            <MaterialIcons name="sticky-note-2" size={24} color="white" />
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
