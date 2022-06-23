import React from 'react';
import { IconButton, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { useFridgeContext } from '../../FridgeContext.jsx';

export default function DeleteReviewItem({ index }) {
  const {
    reviewItemsDispatch,
    dispatchHelpers: { removeReviewItem },
  } = useFridgeContext();

  const handleDeleteReviewItem = (reviewItemId) => {
    reviewItemsDispatch(removeReviewItem(reviewItemId));
  };

  return (
    <IconButton
      size="sm"
      icon={<Icon as={Ionicons} name="trash-sharp" color="danger.700" />}
      onPress={() => { handleDeleteReviewItem(index); }}
    />
  );
}
