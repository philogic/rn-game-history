import React from 'react';
import { FlatList } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class App extends React.Component<> {
  constructor(props) {
    super(props);
    this.itemsDb = firebaseApp.database().ref('/Games');
    this.state = { games: [] }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      title={`Round ${item.round}`}
      subtitle={
        `Computer Score ${item.computerScore}   Human Score ${item.humanScore}`
      }
    />
  );

  renderHeader = () => (
    <Header
      centerComponent={{text: 'GAME HISTORY',}}
    />
  );

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
      //console.log(this.state);
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsDb)
  }

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        keyExtractor={this.keyExtractor}
        data={this.state.games}
        renderItem={this.renderItem}
      />
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

