import React, { useContext, useEffect, useState } from "react";
import { View, Box } from "native-base";
import { useFridgeContext, FridgeContext } from "../FridgeContext.js";

export default function ReviewItems() {
  const { reviewState } = useContext(FridgeContext);
  // const retrieveReviewItems = reviewDispatchHelpers[0];
  // const { reviewDispatch } = useFridgeContext();

  // const [reviewItemIds, _] = useState(reviewState);
  console.log(reviewState)

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Box>Review Screen!</Box>
      Current Review Ids:
      {reviewState && reviewState.reviewItemIds.map((x)=><Box key={x}>{x}</Box>)}
		</View>
	);
}
