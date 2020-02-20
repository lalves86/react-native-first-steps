import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import './config/ReactotronConfig';

console.tron.log('Hello world');

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  }
});

export default App;
