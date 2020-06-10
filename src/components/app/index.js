import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Header, SearchBar, ListItem } from 'react-native-elements'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';


const App = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(15)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fecthData = async () => {
      setLoading(true)
      const res = await axios.get('https://spcovidimpact.herokuapp.com/api/data')
      setData(res.data.data)
      setLoading(false)
    }

    fecthData()
  }, [])

  const isLoading = () => {
    if (loading) {
      return (
        <View style={[styleLoading.container, styleLoading.horizontal]}>
          <ActivityIndicator size="large" color="#83878D" />
        </View>
      )
    }
  }


  const indexOfLastItem = currentPage * dataPerPage > data.length ? data.length : currentPage * dataPerPage;
  const indexOfFirstItem = 0
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0
    return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
  }

  const fetchData = () => {
    setCurrentPage(currentPage + 1)
  }

  const renderRow = (({ item }) =>
    <ListItem key={item.Cumum} title={item.Municip} subtitle={item.Province} />)

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
        onChangeText={setSearch}
        value={search}
        showLoading={loading}
      />
      {isLoading()}
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={currentItems}
        renderItem={renderRow}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            fetchData()
          }
        }}
        scrollEventThrottle={400}
      />
    </View>
  );
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

const styleLoading = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App