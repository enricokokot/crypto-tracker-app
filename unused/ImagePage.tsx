import React from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {styles} from '../style/styles';

export const ImagePage = () => {
  const REMOTE_IMAGE_PATH =
    'https://m.vecernji.hr/media/img/28/0b/35ba610164154771b4a3.jpeg';
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
            // nešto nešto bo
            // buttonPositive: undefined,
            buttonPositive: '',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = REMOTE_IMAGE_PATH;
    // let ext = getExtention(image_URL).toString();
    let ext = getExtention(image_URL)?.toString();
    // također neka pobuna
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = (filename: string) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.centeredScreen}>
      <View style={{alignItems: 'center'}}></View>
      <Image
        source={{
          uri: REMOTE_IMAGE_PATH,
        }}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'contain',
          margin: 5,
          backgroundColor: 'transparent',
        }}
      />
      <TouchableOpacity
        style={styles.transparentButton}
        onPress={checkPermission}>
        <Text style={styles.screenText}>Download Image</Text>
      </TouchableOpacity>
    </View>
  );
};

// novododana funkcija za ispravak greške
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
