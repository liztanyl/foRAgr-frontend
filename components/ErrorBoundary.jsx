/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { DevSettings } from 'react-native';
import { View, Text, Button } from 'native-base';

const handleRestart = () => {
  console.log('problem');
  DevSettings.reload();
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
          <Button
            size="lg"
            p={5}
            mt={5}
            onPress={handleRestart}
            bg="secondary.600"
          >
            Restart App
          </Button>
        </View>
      );
    }
    return this.props.children;
  }
}
