/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { DevSettings } from 'react-native';
import {
  View, Text, Button, VStack,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleRestart = () => {
  console.log('problem');
  DevSettings.reload();
};

const handleResetAsyncStorage = () => {
  AsyncStorage.clear();
};

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
      errorInfo: '',
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(`Error: ${error}`);
    console.log(`Error Info: ${errorInfo}`);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Oops!!! Something went wrong..</Text>
          <VStack space={1} alignItems="center">

            <Button
              size="lg"
              p={5}
              mt={5}
              onPress={handleRestart}
              bg="secondary.600"
            >
              Restart App
            </Button>

            <Button
              size="lg"
              p={5}
              mt={5}
              onPress={handleResetAsyncStorage}
              bg="tertiary.600"
            >
              Reset AsyncStorage
            </Button>

          </VStack>
        </View>
      );
    }
    return this.props.children;
  }
}
