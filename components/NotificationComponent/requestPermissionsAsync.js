import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  let finalStatus = settings.status;
  // if not granted permission
  if (settings.status !== 'granted' && settings.canAskAgain) {
    // request permission again
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Not granted access for notification');
  }
}

export default allowsNotificationsAsync;

// request for permission when user sign up
// create notification when item is added to fridge
