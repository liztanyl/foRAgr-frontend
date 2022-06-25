import {
  Pressable, Text, HStack, VStack, Avatar,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import moment from 'moment';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  logoutButton: {

  },
});

export default function UserProfile({ userDetails }) {
  React.useEffect(() => {
    console.log(userDetails);
  });
  const {
    email, name, picture, createdAt,
  } = userDetails;
  return (
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center', height: '30%',
    }}
    >
      <VStack space={1} alignItems="center">
        <Avatar
          size="xl"
          source={{
            uri: picture,
          }}
          marginBottom={3}
        />
        <Text bold fontSize="md">{name}</Text>
        <Text>{email}</Text>
        <Text fontSize="sm" italic="true">
          FoRAg'ing since
          {' '}
          {moment(createdAt).format('D MMMM YYYY')}
        </Text>
      </VStack>
    </View>
  );
}
