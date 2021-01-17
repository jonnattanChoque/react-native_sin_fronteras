import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({onChange, value, onSubmit}) => {
    return(
        <TextInput onSubmitEditing={onSubmit} onChangeText={onChange} value={value} style={styles.input} />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#eee',
        height: 34,
        padding: 5,
        margin: 10,
        alignSelf: 'stretch'
    }
})

export default Input