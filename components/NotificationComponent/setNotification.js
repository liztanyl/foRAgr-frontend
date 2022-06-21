import * as Notifications from 'expo-notifications';
import moment from 'moment';

const setNotification = async (foodItem, shelfLife, expiry) => {
  const daysNotificationBeforeExpiry = Math.floor(0.1 * shelfLife);
  const dateToNotify = moment(expiry, 'DD-MM-YYYY').toDate();
  dateToNotify.setDate(dateToNotify.getDate() - daysNotificationBeforeExpiry);
  dateToNotify.setHours(9, 0, 0, 0);

  const notificationIdentifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Food Expiry Warning!',
      body: `${foodItem} is about to expire! If consumed, open app to mark consumed.`,
      sound: true,
    },
    // trigger: dateToNotify, // TODO: COMMENT THIS OUT FOR PROD and DELETE below trigger key
    trigger: {
      seconds: 10,
    },
  });
  return notificationIdentifier;
};

export default setNotification;
