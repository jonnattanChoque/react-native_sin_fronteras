import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default ({navigation}) => {
    const title = navigation.getParam('title')
    const body = navigation.getParam('body')
    const name = navigation.getParam('userName')

    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{title}</Text>
            <Text>{body}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});