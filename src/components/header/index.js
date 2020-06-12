import React from 'react'
import { Header } from 'react-native-elements'

const MyHeader = () => {
    return (
        <Header
        placement="left"
        backgroundColor="#F5F5F5"
        leftComponent={{ icon: 'menu', color: 'black' }}
        centerComponent={{ text: 'Covid Impact in Spain', style: { color: 'black' } }}
        rightComponent={{ icon: 'home', color: 'black' }}
      />
    )
}

export default MyHeader