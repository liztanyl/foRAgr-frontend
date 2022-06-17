import React from 'react';
import { View, Box } from 'native-base';
import { useFridgeContext } from '../FridgeContext.js';

export default function ReviewItems() {
	const { reviewState } = useFridgeContext();

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Box>Review Screen!</Box>
			Current Review Ids:
			{reviewState &&
				reviewState.reviewItemIds.map((x) => <Box key={x}>{x}</Box>)}
		</View>
	);
}
