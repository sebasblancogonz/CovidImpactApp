import React, { useState, useEffect, useRef } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Header, SearchBar, ListItem, Icon } from 'react-native-elements'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';


const App = () => {
  const _isMounted = useRef(true)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(15)
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    return () => {
      _isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const fecthData = async () => {
      setLoading(true)
      const res = await axios.get('https://spcovidimpact.herokuapp.com/api/data')
      setData(res.data.data)
      setLoading(false)
    }

    fecthData()
  }, [])

  useEffect(() => {
    let f = data.filter((d) => {
      return d.Municip.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search)
    })

    setFilteredData(f)
  }, [search])

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
  const currentItems = data.slice(0, indexOfLastItem)

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - 20;
  }

  const renderRow = (({ item, index }) =>
    <ListItem leftSubtitle={`${index + 1}`} key={item.Cumum} title={item.Municip} subtitle={item.Province} />)

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
        placeholder="Type your municipality..."
        onChangeText={setSearch}
        value={search}
        showLoading={loading}
      />
      {isLoading()}
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={(filteredData && filteredData.length == 0) ? currentItems : filteredData}
        renderItem={renderRow}
        bounces={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setCurrentPage(currentPage + 1)
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