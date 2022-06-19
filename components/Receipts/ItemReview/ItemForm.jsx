import React, { useEffect, useState } from 'react';
import { Box, Select, Center, FormControl } from 'native-base';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import CategorySelector from './CategorySelector.jsx';
import StorageSelector from './StorageSelector.jsx';
import ShelfLifeDays from './ShelfLifeDays.jsx';
import PurchaseDateInput from './PurchaseDateInput.jsx';
import ExpiryDate from './ExpiryDate.jsx';
import DeleteReviewItem from './DeleteReviewItem.jsx';

export default function ItemForm({ item, index }) {
  const { name, categories } = item;
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedStorage, setSelectedStorage] = useState();
  const [purchaseDate, setPurchaseDate] = useState(
    moment(new Date()).format('DD-MM-YYYY')
  );
  const [updatedShelfLifeDays, setUpdatedShelfLifeDays] = useState(
    selectedStorage ? selectedStorage.shelfLifeDays : null
  );

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
      <DeleteReviewItem index={index} />
      <CategorySelector
        index={index}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory && (
        <StorageSelector
          index={index}
          selectedCategory={selectedCategory}
          selectedStorage={selectedStorage}
          setSelectedStorage={setSelectedStorage}
        />
      )}
      {selectedStorage && (
        <ShelfLifeDays
          index={index}
          selectedStorage={selectedStorage}
          updatedShelfLifeDays={updatedShelfLifeDays}
          setUpdatedShelfLifeDays={setUpdatedShelfLifeDays}
        />
      )}
      <PurchaseDateInput
        index={index}
        purchaseDate={purchaseDate}
        setPurchaseDate={setPurchaseDate}
      />
      {selectedStorage && (
        <ExpiryDate
          index={index}
          purchaseDate={purchaseDate}
          updatedShelfLifeDays={updatedShelfLifeDays}
        />
      )}
    </Box>
  );
}
