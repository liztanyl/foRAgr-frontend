import React from 'react';
import moment from 'moment';
import { Badge } from 'native-base';

export const setDays = (expiry) => {
  const diff = moment(expiry).diff(new Date(), 'days');
  let expiryDateTag;
  switch (diff) {
    case 0:
      expiryDateTag = 'today';
      break;
    case 1:
      expiryDateTag = 'in a day';
      break;
    default:
      expiryDateTag = `${moment(expiry).fromNow()}`;
  }
  return expiryDateTag;
};

export default function ExpiryDateBadge({ expiryDate }) {
  const diff = moment(expiryDate).diff(new Date(), 'days');

  let color;
  if (diff < 4) color = 'warning';
  else if (diff < 14) color = 'info';
  else color = 'success';
  const variant = diff < 14 ? 'solid' : 'outline';

  return (
    <Badge alignSelf="center" colorScheme={color} variant={variant} borderRadius="sm">
      {`Expires ${setDays(expiryDate)}`}
    </Badge>
  );
}
