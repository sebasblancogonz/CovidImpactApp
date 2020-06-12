import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const LoadIndicator = () => (
    <View style={[styleLoading.container, styleLoading.horizontal]}>
        <ActivityIndicator size="large" color="#83878D" />
    </View>
)

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

export default LoadIndicator