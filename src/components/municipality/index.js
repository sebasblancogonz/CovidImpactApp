import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { View } from 'react-native'

export default class Municipalities extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        const { list } = this.props
        console.log("eheee", list)
        return(
            <View>
                {list && list.map((m, i) => (
                    <ListItem
                        key={i}
                        title={m.Municip}
                        subtitle={m.Province}
                        bottomDivider
                    />
                ))}
            </View>
        )
    }
}