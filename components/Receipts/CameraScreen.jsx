// import { Divider, Box, Button } from 'native-base';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, Platform,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons, Octicons, Entypo } from '@expo/vector-icons';
import { Box, HStack } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { BACKEND_URL } from '../../store.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderFocus: {
    width: '70%',
    height: '80%',
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderWidth: 2,
  },
  controls: {
    backgroundColor: 'black',
    height: '12%',
  },
  button: {
    color: 'white',
    justifyContent: 'flex-start',
  },
});

function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  // create camera ref
  const cameraRef = useRef(null);

  // check for camera and camera roll access
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraPermission.status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // take photo
  const takePhoto = async () => {
    if (cameraRef) {
      console.log('in take picture');
    }
    try {
      const photo = await cameraRef.current.takePictureAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      return photo;
    } catch (e) {
      console.log(e);
    }
  };
  const sendPhotoBackend = (data) => {
    console.log('send photo to back end');
    console.log(data.uri, 'data');
    const sendPhotoData = async () => {
      const photoDataResponse = await axios.post(`${BACKEND_URL}/photoData`, {
        imageData: data.uri,
      });
      console.log(photoDataResponse.data);
      navigation.navigate('See Parsed Receipt', { parsedData: photoDataResponse.data });
    };
    sendPhotoData();
  };

  const uploadPhoto = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // setImage(result.uri);
      sendPhotoBackend(result);
    }
  };

  // connection got error

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <HStack justifyContent="space-between">
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}
          >
            <Ionicons name="ios-camera-reverse-sharp" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => uploadPhoto()}
          >
            <Entypo name="upload" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              sendPhotoBackend('sample data');
            }}
          >
            <Text style={styles.button}>Skip</Text>
          </TouchableOpacity>
        </HStack>
        <View style={styles.buttonContainer}>
          <Box style={styles.borderFocus} />
        </View>
        <Box style={styles.controls}>
          <HStack justifyContent="center">
            <TouchableOpacity
              onPress={async () => {
                const r = await takePhoto();
                Alert.alert('DEBUG', JSON.stringify(r));
                sendPhotoBackend(r);
              }}
            >
              <Octicons name="circle" size={50} color="white" />
            </TouchableOpacity>
          </HStack>
        </Box>
      </Camera>
    </View>
  );
}

export default CameraScreen;
