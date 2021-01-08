import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Camera } from 'expo-camera';

export default function App() {

  const [locacion, setLocation] = useState({})
  const [permisos, setPermisos] = useState(null)
  const [tipo, setTipo] = useState(Camera.Constants.Type.back)

  const buscaLocation = async () => {
    const {status} = await Location.requestPermissionsAsync()
    if (status !== 'granted') {
      return Alert.alert('No tenemos los permisos necesarios')
    }

    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }

  const getPermisos = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    console.log(status)
    setPermisos(status == 'granted')
    console.log(status)
  }

  useEffect(() => {
    getPermisos()
  })

  if (permisos === null){
    console.log("uno")
    return <View><Text>Cargando permisos</Text></View>
  }

  if (permisos === false){
    console.log("dos")
    return <View><Text>No hay permisos permisos</Text></View>
  }

  const cambiarTipo = () => {
    const { front, back} = Camera.Constants.Type
    const nuevoTipo = tipo == back ? front : back
    setTipo(nuevoTipo) 
  }

  return (
    <View style={styles.container}>
      {/* <MapView style={styles.map} >
        {locacion.coords
          ? <Marker 
              coordinate={locacion.coords}
              title="titulo"
              description="Descripción del punto"
            />
          : null
        }
      </MapView> */}
      <Camera style={styles.camera} type={tipo}>
        <Button style={styles.boton} title="Cambiar" onPress={cambiarTipo} />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    marginTop: '50%'
  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
