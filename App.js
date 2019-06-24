import React from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class App extends React.Component<> {
  constructor(props) {
    super(props)
    this.itemsDb = firebaseApp.database().ref('/Games');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

