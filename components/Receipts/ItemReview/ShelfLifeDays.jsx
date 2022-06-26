import React, { useEffect } from 'react';
import {
  Input, FormControl, IconButton, Icon, Text, HStack,
} from 'native-base';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFridgeContext } from '../../FridgeContext.jsx';

const SHELF_LIFE_DAYS = 'shelfLifeDays';

export default function ShelfLifeDays({
  reviewItemId,
  selectedStorage,
  updatedShelfLifeDays,
  setUpdatedShelfLifeDays,
  expiryDate, purchaseDate,
}) {
  const { shelfLifeDays } = selectedStorage;
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  useEffect(() => {
    setUpdatedShelfLifeDays(shelfLifeDays);
    reviewItemsDispatch(editReviewItem(reviewItemId,
      SHELF_LIFE_DAYS,
      shelfLifeDays));
  }, [selectedStorage]);

  const differenceCalculated = moment(expiryDate, 'DD-MM-YYYY').diff(moment(purchaseDate, 'DD-MM-YYYY'), 'days');

  const handleUpdatedShelfLifeDays = (itemValue) => {
    if (itemValue.match(/^[0-9]+$/)) {
      setUpdatedShelfLifeDays(Number(itemValue));
      reviewItemsDispatch(editReviewItem(reviewItemId,
        SHELF_LIFE_DAYS,
        Number(itemValue)));
    } else if (!itemValue) {
      setUpdatedShelfLifeDays(null);
      reviewItemsDispatch(editReviewItem(reviewItemId, SHELF_LIFE_DAYS, 0));
    }
    console.log(updatedShelfLifeDays);
  };

  return (
    <FormControl isRequired>
      <Text
        fontSize="xs"
        textTransform="uppercase"
        color="primary.800"
      >
        Days to Expiry
      </Text>
      <Text
        fontSize="xs"
        textTransform="uppercase"
        color="secondary.800"
      >
        (Average Shelf Life in Days:
        {' '}
        {shelfLifeDays}
        )
      </Text>
      <Input
        w="50%"
        type="text"
        variant="outline"
        InputRightElement={(
          <IconButton
            onPress={() => setUpdatedShelfLifeDays(shelfLifeDays)}
            icon={<Icon as={MaterialCommunityIcons} name="restart" />}
          />
        )}
        placeholder="Enter shelf life length in days"
        value={(
          differenceCalculated === shelfLifeDays
            ? updatedShelfLifeDays?.toString()
            : differenceCalculated.toString()
        )}
        onChangeText={handleUpdatedShelfLifeDays}
      />
    </FormControl>
  );
}
