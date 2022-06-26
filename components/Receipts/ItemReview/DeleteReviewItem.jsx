import React from 'react';
import {
  IconButton, Icon, useToast,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { useFridgeContext } from '../../FridgeContext.jsx';
import displayToast from '../../displayToast.jsx';

export default function DeleteReviewItem({ reviewItemId, reviewItemName }) {
  const {
    reviewItemsDispatch,
    dispatchHelpers: { removeReviewItem },
  } = useFridgeContext();
  const toast = useToast();

  const handleDeleteReviewItem = () => {
    reviewItemsDispatch(removeReviewItem(reviewItemId));
    displayToast(toast, `${reviewItemName.toUpperCase()} was removed from item review`, 'secondary.600');
  };

  return (
    <IconButton
      size="sm"
      icon={<Icon as={Ionicons} name="trash-sharp" color="danger.700" />}
      onPress={handleDeleteReviewItem}
    />
  );
}
