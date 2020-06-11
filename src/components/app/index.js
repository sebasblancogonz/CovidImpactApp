import React, { useState, useEffect, useRef } from 'react';
import TouchableScale from 'react-native-touchable-scale'
import { Platform, StyleSheet, View } from 'react-native';
import { SearchBar, ListItem, Overlay } from 'react-native-elements'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';
import Header from '../header';
import LoadIndicator from '../loadIndicator';
import Municipality from '../municipality';


const App = () => {
  const _isMounted = useRef(true)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [visible, setVisible] = useState(false)
  const [cardItem, setCardItem] = useState({})


  const indexOfLastItem = currentPage * 15 > data.length ? data.length : currentPage * 15;
  const currentItems = data.slice(0, indexOfLastItem)

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - 20;
  }

  const isLoading = () => {
    if(loading) return (
      <LoadIndicator isLoading={loading} />
    )
  }

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

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const renderRow = (({ item, index }) =>
    <ListItem
      leftSubtitle={`${index + 1}`}
      key={item.Cumum}
      title={item.Municip}
      subtitle={item.Province}
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      onPress={() => {
        setCardItem(item)
        setVisible(true)
      }}
    />)

  return (
    <View style={styles.container}>
      <Header />
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
      <View style={{width:100}}>
      <Overlay overlayStyle={{width: 400, height: 500}} isVisible={visible} onBackdropPress={toggleOverlay}>
        <Municipality {...cardItem} />
      </Overlay>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  }
});

export default App