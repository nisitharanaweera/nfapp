import React from 'react';
import { View, Button, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';

const App = () => {
  const requestWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permission to write to storage',
          message: 'App needs access to your storage to write a file',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handlePress = async () => {
    const hasPermission = Platform.OS === 'ios' || await requestWritePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required to save the file');
      return;
    }

    const filePath = `${RNFS.DownloadDirectoryPath}/example.txt`;
    const fileContent = 'This is a sample sentence in the text file.';

    try {
      await RNFS.writeFile(filePath, fileContent, 'utf8');
      Alert.alert('File Saved', 'File has been saved successfully in the Downloads folder');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save the file');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Save File" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background color
  },
});

export default App;
