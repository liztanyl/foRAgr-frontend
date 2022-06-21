import * as Notifications from 'expo-notifications';

const cancelNotification = async (identifier) => {
  await Notifications.cancelScheduledNotificationAsync(identifier);
};

export default cancelNotification;
