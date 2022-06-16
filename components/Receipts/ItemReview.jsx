import React, { useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../store';
import { useFridgeContext } from '../FridgeContext';
import { Box } from 'native-base';

export default function ItemReview() {
	const { reviewState, reviewDispatch, reviewDispatchHelpers } =
		useFridgeContext();

	console.log(reviewState.reviewItemIds);
	// const { reviewItemIds } = reviewState;
	const reviewItemIds = [1, 2, 3, 4, 5];

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/reviewItems/${reviewItemIds}`)
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	return <Box>ItemReview</Box>;
}
