import axios from 'axios';
import * as Notifications from 'expo-notifications';
import moment from 'moment';

import { BACKEND_URL } from '../../store.js';

const setNotification = (fridgeItem, jwtToken) => {
  const {
    id,
    name: foodItem,
    shelfLifeDays: shelfLife,
    expiryDate: expiry,
  } = fridgeItem;

  const daysNotificationBeforeExpiry = Math.floor(0.1 * shelfLife);
  const dateToNotify = moment(expiry, 'DD-MM-YYYY').toDate();
  dateToNotify.setDate(dateToNotify.getDate() - daysNotificationBeforeExpiry);
  dateToNotify.setHours(9, 0, 0, 0);

  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Food Expiry Warning!',
      body: `${foodItem} is about to expire! If consumed, open app to mark consumed.`,
      sound: true,
    },
    // trigger: dateToNotify, // TODO: COMMENT THIS OUT FOR PROD and DELETE below trigger key
    trigger: {
      seconds: 10,
    },
  }).then((notificationIdentifier) => {
    console.log('🍔', jwtToken);

    axios.post(`${BACKEND_URL}/fridgeItems/notification/add/${id}`, {
      notificationIdentifier,
      userToken: jwtToken,
    });
  });
};

export default setNotification;
