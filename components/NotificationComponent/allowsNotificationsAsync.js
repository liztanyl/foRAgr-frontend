import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
// request for permission when user sign up

async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  // console.log(settings);
  let finalStatus = settings.status;
  // if not granted permission
  if (settings.status !== 'granted' && settings.canAskAgain) {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Not granted access for notification');
  }
}

export default allowsNotificationsAsync;
