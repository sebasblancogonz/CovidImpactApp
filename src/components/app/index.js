import React, { Component } from 'react';
import axios from 'axios'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Header, SearchBar } from 'react-native-elements'
import Municipalities from '../municipality/index'


export default class App extends Component {

  state = {
    search: '',
    loading: false,
    datasource: [],
  }

  updateSearch = (search) => {
    this.setState({ search })
    this.getResults(search)
  }


  getResults = () => {
    console.log(this.getUrl(this.state.search))
    axios.get(this.getUrl(this.state.search))
    .then(resp => {
      console.log("on apppppp", resp.data)
      this.setState({
        loading: false,
        datasource: resp.data,
      })
    }).catch((error) => {
      console.log(error)
    })
}

getUrl(search) {
  return 'https://spcovidimpact.herokuapp.com/api/data'.concat(search != '' ? '?municipality=' + search : '')
}

  render() {
    const { search, loading, datasource } = this.state;
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
          showLoading={loading}
        />
      <Municipalities list={datasource} />
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
