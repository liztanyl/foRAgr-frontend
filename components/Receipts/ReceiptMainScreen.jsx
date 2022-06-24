import { VStack, Button } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ReciptMainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems="stretch" justifyContent="center" width="100%" padding={5}>
        <Button
          size="lg"
          height="40%"
          colorScheme="primary"
          _text={{ fontSize: '2xl' }}
          leftIcon={<MaterialIcons name="camera-alt" size={24} color="white" />}
          onPress={() => navigation.navigate('Camera Mode')}
        >
          Camera Mode
        </Button>
        <Button
          size="lg"
          height="40%"
          colorScheme="secondary"
          _text={{ fontSize: '2xl' }}
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
