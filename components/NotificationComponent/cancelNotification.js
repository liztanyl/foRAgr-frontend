import * as Notifications from 'expo-notifications';

const cancelNotification = (identifier) => {
  Notifications.cancelScheduledNotificationAsync(identifier);
};

export default cancelNotification;
