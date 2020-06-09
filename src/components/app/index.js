import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Header, SearchBar } from 'react-native-elements'


export default class App extends Component {

  state = {
    search: '',
    searching: false,
  }

  updateSearch = (search) => {
    this.setState({ search, searching: true })
    setTimeout(() => {
      this.setState({ searching: false })
    }, 200)
  }

  render() {
    const { search, searching } = this.state;
    return (
      <View style={styles.container}>
        <Header
          placement="left"
          backgroundColor="#F5F5F5"
          leftComponent={{ icon: 'menu', color: 'black' }}
          centerComponent={{ text: 'Covid Impact in Spain', style: { color: 'black' } }}
          rightComponent={{ icon: 'home', color: 'black' }}
        />
        <SearchBar
          platform={Platform.OS}
          placeholder="Type municipality, province..."
          onChangeText={this.updateSearch}
          value={search}
          showLoading={searching}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
