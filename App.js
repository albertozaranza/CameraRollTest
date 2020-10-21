import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {getAlbums} from '@react-native-community/cameraroll';

const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};

const handleGetAlbums = async () => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }

  try {
    const albums = await getAlbums({assetType: 'All'});

    console.log(albums);

    return albums;
  } catch (error) {
    return error;
  }
};

const App = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={handleGetAlbums}>
        <Text>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
