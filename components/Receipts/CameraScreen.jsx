// import { Divider, Box, Button } from 'native-base';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Platform,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons, Octicons, Entypo } from '@expo/vector-icons';
import {
  Box, HStack, Text,
} from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native';
import { GOOGLE_API_KEY } from '../../secret.js';
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
    borderColor: 'transparent',
    borderWidth: 2,
  },
  controls: {
    height: '12%',
  },
  button: {
    color: 'white',
    justifyContent: 'flex-start',
  },
  loadingView: {
    display: 'flex',
    flex: 1,
    marginBottom: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [loading, setLoader] = useState(false);

  // create camera ref
  const cameraRef = useRef(null);
  const animation = useRef(null);

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

  const sendPhotoGCloud = (data) => {
    setLoader(true);
    const sendPhotoData = async () => {
      try {
        const base64Content = Platform.OS === 'web' ? data.base64.slice(22) : data.base64;
        const photoDataResponse = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`, {
          requests: [
            {
              image: {
                content: base64Content,
              },
              features: [
                {
                  type: 'DOCUMENT_TEXT_DETECTION',
                  maxResults: 1,
                },
              ],
            },
          ],
        });
        console.log(Object.keys(photoDataResponse.data.responses[0]));

        if (Object.keys(photoDataResponse.data.responses[0]).length === 0) {
          navigation.navigate('No data');
        }
        const detection = photoDataResponse.data?.responses[0]?.textAnnotations[0];
        const backendResponse = await axios.post(`${BACKEND_URL}/photoData`, { detection });

        if (photoDataResponse.data.length > 0) {
          setLoader(false);
        }

        navigation.navigate('See Parsed Receipt', { parsedData: backendResponse });
      }
      catch (error) {
        console.log(error);
      }
    };
    console.log(sendPhotoData());
    sendPhotoData();
  };
  // take photo
  // eslint-disable-next-line consistent-return
  const takePhoto = async () => {
    if (cameraRef) {
      console.log('in take picture');
    }
    try {
      const photo = await cameraRef.current.takePictureAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      sendPhotoGCloud(photo);
    } catch (e) {
      console.log(e);
    }
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
      sendPhotoGCloud(result);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingView}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'transparent',
            }}
        // Find more Lottie files at https://lottiefiles.com/featured
            source={require('../../assets/veggieLoader.json')}
          />
          <Text textAlign="center"> Loading... </Text>
        </View>
      )
        : (
          <>
            <Text p={2} textAlign="center" color="white" bg="black"> To optimize search, please take against a plain background</Text>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
              <View style={styles.buttonContainer}>
                <Box style={styles.borderFocus} />
              </View>
              <Box style={styles.controls}>
                <HStack p={2} justifyContent="space-between" alignItems="center">
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setType(type === CameraType.back ? CameraType.front : CameraType.back);
                    }}
                  >
                    <Ionicons name="ios-camera-reverse-sharp" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      const r = await takePhoto();
                    }}
                  >
                    <Octicons name="circle" size={50} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => uploadPhoto()}
                  >
                    <Entypo name="upload" size={30} color="white" />
                  </TouchableOpacity>
                </HStack>
              </Box>
            </Camera>
          </>
        )}
    </View>
  );
}

export default CameraScreen;
