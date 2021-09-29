import React from 'react';
import {Button, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const ImageScreen = () => {
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxHeight: 500,
        maxWidth: 500,
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
      },
    );
  };

  const openLib = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxHeight: 500,
        maxWidth: 500,
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
      },
    );
  };
  return (
    <View>
      <Text>Image</Text>
      <Button title="get" onPress={openCamera}></Button>
      <Button title="get yes" onPress={openLib}></Button>
    </View>
  );
};
