import { Divider, Box, Button } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';

function ReciptMainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Box>
        <Button onPress={() => navigation.navigate('Camera Mode')}>
          Camera Mode
        </Button>
      </Box>
      <Divider
        my='2'
        _light={{
          bg: 'muted.800',
        }}
        _dark={{
          bg: 'muted.50',
        }}
      />
      <Box>
        <Button onPress={() => console.log('hello')}>Manual Entry</Button>
      </Box>
    </View>
  );
}

export default ReciptMainScreen;
