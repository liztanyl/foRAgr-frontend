import React, { useRef } from 'react';
import {
  View, Button, Box, Text, Stack, Image, HStack,
} from 'native-base';
import {
  StyleSheet, ScrollView, Animated,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import anim1 from '../assets/ani1.png';
import anim2 from '../assets/ani2.png';
import anim3 from '../assets/ani3.png';
import anim0 from '../assets/mainLogo.png';
import googleIcon from '../assets/google_normal_icon.png';

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  logo1: {
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    height: 240,
    width: 240,
    alignSelf: 'center',
  },
  textContainer: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    paddingBottom: 5,
    borderRadius: 5,
    height: 60,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',

  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    marginTop: 30,
    color: '#15181f',
    display: 'flex',
    backgroundColor: '#fff',

    padding: 0,
    margin: 0,
  },
  googleImg: {
    width: 50,
    height: 50,
  },
  buttonText: {
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
    fontSize: 14,
  },
});

function AppInfo({ handleLogin }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  const imagesInfo = [
    {
      img: anim0,
      text: 'Keep track of what\'s in your fridge to reduce food wastage',
    },

    {
      img: anim1,
      text: 'Snap a photo of your receipt and add groceries to your virtual fridge',
    },
    {
      img: anim2,
      text: 'Easily search for common groceries',
    },
    {
      img: anim3,
      text: 'Receive notifications on near-expiring food items',
    },

  ];
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ])}
            scrollEventThrottle={1}
          >
            {imagesInfo.map((image, imageIndex) => (
              <Animated.View
                style={
                  {
                    width: windowWidth,
                    height: 300,
                  }
                }
                key={imageIndex}

              >
                <ImageBackground source={image.img} style={styles.card} alt="scroll-view" />
                <View style={styles.textContainer}>
                  <Text style={styles.infoText} fontFamily="heading">
                    {image.text}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {imagesInfo.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, { width }]}
                />
              );
            })}
          </View>
        </View>
        <Button.Group
          style={styles.buttonLogin}
          shadow={2}
          isAttached
          mx={{
            base: 'auto',
            md: 0,
          }}
          size="sm"
        >
          <Button p={0} bg="transparent" borderLeftColor="transparent">
            <Image
              style={styles.googleImg}
              source={googleIcon}
            />
          </Button>
          <Button
            style={styles.buttonText}
            onPress={handleLogin}
            _text={{ color: '#1F2937' }}
          >
            Sign in with Google
          </Button>
        </Button.Group>
      </SafeAreaView>
    </View>
  );
}

export default AppInfo;
