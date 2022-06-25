import {
  VStack, Button, Pressable, Text, Icon, HStack,
} from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

function ReciptMainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems="stretch" justifyContent="center" width="100%" padding={5}>
        <Pressable
          height="25%"
          borderRadius={3}
          bg="primary.600"
          _pressed={{ bg: 'primary.800' }}
          onPress={() => navigation.navigate('Camera Mode')}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <HStack space={5} alignItems="center">
            <Icon as={MaterialIcons} name="camera-alt" size="xl" color="white" />
            <Text fontSize="2xl" color="white">Camera Mode</Text>
          </HStack>
        </Pressable>
        <Pressable
          height="25%"
          borderRadius={3}
          bg="secondary.600"
          _pressed={{ bg: 'secondary.800' }}
          onPress={() => navigation.navigate('Manual Entry')}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <HStack space={5} alignItems="center">
            <Icon as={MaterialCommunityIcons} name="lead-pencil" size="xl" color="white" />
            <Text fontSize="2xl" color="white">Manual Entry</Text>
          </HStack>
        </Pressable>
        <Pressable
          height="25%"
          borderRadius={3}
          bg="tertiary.600"
          _pressed={{ bg: 'tertiary.800' }}
          onPress={() => navigation.navigate('Review Items')}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <HStack space={5} alignItems="center">
            <Icon as={MaterialCommunityIcons} name="clipboard-check" size="xl" color="white" />
            <Text fontSize="2xl" color="white">Review Items</Text>
          </HStack>
        </Pressable>
      </VStack>
    </View>
  );
}

export default ReciptMainScreen;
