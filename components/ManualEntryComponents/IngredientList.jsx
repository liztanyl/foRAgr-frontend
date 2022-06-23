import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Box, Text, IconButton, CloseIcon, HStack,
} from 'native-base';

export default function IngredientList({ selected, setSelectedList }) {
  const styles = StyleSheet.create({
    boxDisplay: {
      padding: 5,
      borderRadius: 5,
      marginTop: 10,
    },
  });

  const handleDelete = (deletedId) => {
    setSelectedList((prev) => prev.filter((x) => x.id !== deletedId));
  };

  const selectedDisplay = selected.map((x) => (
    <Box
      key={x.name}
      style={styles.boxDisplay}
      bg="secondary.200"
    >
      <HStack paddingLeft={2} alignItems="center" justifyContent="space-between">
        <Text bold>{x.name}</Text>
        <IconButton
          size="sm"
          onPress={() => handleDelete(x.id)}
          icon={<CloseIcon color="danger.800" />}
        />
      </HStack>
    </Box>
  ));

  return <View width="100%">{selectedDisplay}</View>;
}
