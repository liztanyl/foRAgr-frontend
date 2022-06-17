import { Box } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';

function ParsedReceipt({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Box> parsed receipt</Box>
    </View>
  );
}

export default ParsedReceipt;
