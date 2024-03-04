import { StyleSheet, Text, View } from 'react-native';

import * as ExpoTextRecognition from 'expo-text-recognition';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoTextRecognition.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
