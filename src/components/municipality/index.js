import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'

export default class Municipalities extends Component {
    
    constructor(props) {
        super(props)
        
    }
    
    state = {
        list: this.props.list
    }

    render() {
        const { list } = this.state
        return(
            {list && list.map(mu -> {
                return(

                )
            })}
        )
    }
}