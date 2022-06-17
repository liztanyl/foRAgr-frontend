import React, { useEffect, useState } from 'react';
import { Box, Select, Center, FormControl } from 'native-base';
import { StyleSheet } from 'react-native';
import CategorySelector from './CategorySelector';
import StorageSelector from './StorageSelector';

export const allSameCategory = (shelfLifeItems) => {
	let areAllSameCategory = true;
	const firstCategoryName = shelfLifeItems[0].categoryName;
	shelfLifeItems.forEach((i) => {
		if (firstCategoryName != i.categoryName) {
			areAllSameCategory = false;
		}
	});
	console.log(areAllSameCategory);
	return areAllSameCategory;
};

export default function ItemForm({ item }) {
	const { name, shelfLifeItems } = item;
	const [selectedShelfLifeItem, setSelectedShelfLifeItem] = useState();

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

	return (
		<Box style={styles.itemContainer}>
			<Box style={styles.itemName}>{name}</Box>
			<CategorySelector
				shelfLifeItems={shelfLifeItems}
				selectedShelfLifeItem={selectedShelfLifeItem}
				setSelectedShelfLifeItem={setSelectedShelfLifeItem}
			/>
			{selectedShelfLifeItem && (
				<StorageSelector
					shelfLifeItems={shelfLifeItems}
					selectedShelfLifeItem={selectedShelfLifeItem}
				/>
			)}
		</Box>
	);
}
