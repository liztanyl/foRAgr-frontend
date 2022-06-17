import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../store';
import { useFridgeContext } from '../FridgeContext';
import { Box } from 'native-base';
import ItemForm from './ItemReview/ItemForm';

export default function ItemReview() {
	const { reviewState, reviewDispatch, reviewDispatchHelpers } =
		useFridgeContext();

	const [reviewItems, setReviewItems] = useState([]);
	// const { reviewItemIds } = reviewState;
	const reviewItemIds = [31, 49, 3, 4, 5];

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/reviewItems/${reviewItemIds}`)
			.then((response) => {
				console.log(response.data);
				setReviewItems(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Box>
			{reviewItems &&
				reviewItems.map((item) => {
					return <ItemForm item={item} key={item.id} />;
				})}
		</Box>
	);
}
