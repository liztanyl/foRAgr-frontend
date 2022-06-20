import React from 'react';
import moment from 'moment';
import { Badge } from 'native-base';

export default function ExpiryDateBadge({ expiryDate }) {
  const date = moment(expiryDate, 'DD-MM-YYYY');
  const diff = moment(date).diff(new Date(), 'days');

  let color;
  if (diff < 4) color = 'warning';
  else if (diff < 14) color = 'info';
  else color = 'success';

  const variant = diff < 14 ? 'solid' : 'outline';

  return (
    <Badge alignSelf="center" colorScheme={color} variant={variant} borderRadius="sm">
      {`Expires ${moment(date).fromNow()}`}
    </Badge>
  );
}
