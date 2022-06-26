import React from 'react';
import {
  IconButton, Icon, useToast,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

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
    displayToast(toast, `Removed '${reviewItemName}' from review`, 'success');
  };

  return (
    <IconButton
      size="md"
      colorScheme="danger"
      icon={<Icon as={MaterialIcons} name="delete" />}
      onPress={handleDeleteReviewItem}
    />
  );
}
