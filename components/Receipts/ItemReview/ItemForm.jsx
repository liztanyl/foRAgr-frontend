import React, { useEffect, useState } from 'react';
import { Box, Select, Center, FormControl } from 'native-base';
import { StyleSheet } from 'react-native';
import CategorySelector from './CategorySelector.jsx';
import StorageSelector from './StorageSelector.jsx';
import ShelfLifeDays from './ShelfLifeDays.jsx';
import PurchaseDateInput from './PurchaseDateInput.jsx';
import ExpiryDate from './ExpiryDate.jsx';

export default function ItemForm({ item }) {
  const { name, categories } = item;
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedStorage, setSelectedStorage] = useState();

  const styles = StyleSheet.create({
    itemContainer: {
      color: 'black',
      backgroundColor: 'azure',
      padding: 10,
      margin: 10,
    },
    itemName: {
      color: 'black',
      backgroundColor: 'aliceBlue',
      padding: 10,
      margin: 10,
    },
  });

  useEffect(() => {
    if (categories.length == 1) {
      setSelectedCategory(categories[0]);
    }
  }, [selectedCategory]);

  return (
    <Box style={styles.itemContainer}>
      <Box style={styles.itemName}>{name}</Box>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory && (
        <StorageSelector
          selectedCategory={selectedCategory}
          selectedStorage={selectedStorage}
          setSelectedStorage={setSelectedStorage}
        />
      )}
      {selectedStorage && <ShelfLifeDays selectedStorage={selectedStorage} />}
      <PurchaseDateInput />
      <ExpiryDate />
    </Box>
  );
}
