import React from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class App extends React.Component<> {
  constructor(props) {
    super(props);
    this.itemsDb = firebaseApp.database().ref('/Games');
    this.state = { games: [] }
  }

  keyExtractor = (item) => item.id;

  listenForItems(itemsDb) {
    itemsDb.on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          id: child.key,
          round: child.val().round,
          computerScore: child.val().computerScore,
          humanScore: child.val().humanScore
        });
      });

      this.setState({games: items});
      console.log(this.state);
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsDb)
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

