import { Box, HStack } from 'native-base';
import React from 'react';
import { View } from 'react-native';

function ParsedReceipt({ route, navigation }) {
  const { parsedData } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Box>Possible Food Items detected: </Box>
      {parsedData.map((data) => (
        <HStack space={2}>
          <Box>{data.parsedName.toUpperCase()}</Box>
          <Box>{data.match[0].itemName.toUpperCase()}</Box>
        </HStack>
      ))}
    </View>
  );
}

export default ParsedReceipt;
