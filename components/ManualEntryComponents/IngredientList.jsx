import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Box, Text, Button, CloseIcon, HStack, Center } from 'native-base';

export default function IngredientList({ selected, setSelectedList }) {
  const styles = StyleSheet.create({
    boxDisplay: {
      backgroundColor: 'orange',
      padding: 10,
      borderRadius: 5,
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
  });

  const handleDelete = (deletedId) => {
    setSelectedList((prev) => prev.filter((x) => x.id !== deletedId));
  };

  const selectedDisplay = selected.map((x) => (
    <Box key={x.name} style={styles.boxDisplay}>
      <HStack>
        <Center>
          <Text bold>{x.name}</Text>
        </Center>
        <Center style={styles.deleteButton}>
          <Button width="50" variant="ghost" onPress={() => handleDelete(x.id)}>
            <CloseIcon color="danger.800" />
          </Button>
        </Center>
      </HStack>
    </Box>
  ));

  return <View>{selectedDisplay}</View>;
}
