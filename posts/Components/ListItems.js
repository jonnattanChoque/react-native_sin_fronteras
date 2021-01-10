import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({title, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingHorizontal: 15,
        fontSize: 24,
        justifyContent: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
});