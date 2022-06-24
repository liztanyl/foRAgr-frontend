import { Text, Button } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';

function NoData({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> No data found</Text>
      <Button onPress={() => {
        navigation.popToTop();
        navigation.push('Manual Entry');
      }}
      >
        Manual entry
      </Button>
      <Button onPress={() => navigation.replace('Camera Mode')}>Camera Mode</Button>
    </View>
  );
}

export default NoData;
