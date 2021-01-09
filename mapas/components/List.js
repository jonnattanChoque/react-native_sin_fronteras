import React from 'react';
import { StyleSheet, Button, View, FlatList, Text, Dimensions } from 'react-native';

export default ({closeModal, puntos}) => {
    return (
        <>
        <View style={styles.lista}>
            <FlatList data={puntos.map(x => x.name)} renderItem={({item}) => <View style={styles.item}><Text>{item}</Text></View>} keyExtractor={item => item} />
        </View>
        <View style={styles.botton}>
            <Button title="Cerrar" onPress={closeModal} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    botton: {
        padding: 15
    },
    item:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 40,
        padding: 15,
        justifyContent: 'center'
    },
    lista: {
        height: Dimensions.get('window').height - 250
    }
});
