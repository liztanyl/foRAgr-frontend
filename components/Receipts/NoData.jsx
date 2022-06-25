import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  Text, Button, VStack, Center,
} from 'native-base';
import * as React from 'react';
import { View } from 'react-native';

function NoData({ navigation }) {
  return (
    <Center
      style={{
        height: '100%', width: '100%',
      }}
    >
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text fontSize="xl">Could not detect any items</Text>
      </View>
      <VStack flex={1} space={5} alignContent="stretch">
        <Button
          alignItems="center"
          size="lg"
          _text={{ fontSize: 'lg' }}
          leftIcon={<MaterialIcons name="camera-alt" size={24} color="white" />}
          onPress={() => {
            navigation.popToTop();
            navigation.navigate('Camera Mode');
          }}
        >
          Retake photo
        </Button>
        <Button
          size="lg"
          colorScheme="secondary"
          _text={{ fontSize: 'lg' }}
          startIcon={<MaterialCommunityIcons name="lead-pencil" size={24} color="white" />}
          onPress={() => {
            navigation.popToTop();
            navigation.navigate('Manual Entry');
          }}
        >
          Manual Entry
        </Button>
      </VStack>
    </Center>
  );
}

export default NoData;
