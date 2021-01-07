import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, ImageBackground, Modal, Button, Alert } from 'react-native';

export default function App() {

  const [modal, setModal] = useState(false)

  const crearDialogo = () => Alert.alert(
    'titulo', 
    'Mi mensajes', 
    [
      {
        text: 'Cancelar', 
        onPress: () => {}, 
        style: 'cancel'
      },
      {
        text: 'Aceptar',
        onPress: () => console.log('boton aceptar'),
        style: 'default'
      }
    ], 
    {cancelable: false},
  )

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.photo} source={{uri: 'http://placekitten.com/1300/2500'}}>
        <Text>Texto</Text>
      </ImageBackground>
      <ActivityIndicator size="large" color="#ff0000" />
      <Image style={styles.photo} source={require('./assets/icon.png')}/>
      <Image style={styles.photo} source={{uri: 'http://placekitten.com/200/300'}}/>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.center}>
          <View style={styles.content}>
            <Text>Soy un modal</Text>
            <Button title="cerrar" onPress={() => setModal(!modal)} />
          </View>
        </View>
      </Modal>
      <Button title="Abir modal" onPress={() => setModal(!modal)} />
      <Button title="Abir alert" onPress={crearDialogo} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  content:{
    backgroundColor: '#ccc',
    margin: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  center:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  photo:{
    height: 120,
    width: 160
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
