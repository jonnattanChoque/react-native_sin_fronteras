import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Map, Modal, Panel, Input, List } from './components';

export default function App() {
  const [puntos, setPuntos] = useState([])
  const [puntoTemp, setPuntoTemp] = useState({})
  const [nombre, setNombre] = useState('')
  const [visibilityFilter, setVisibilityFilter] = useState('new_punto')
  const [visibility, setVisibility] = useState(false)
  const [pointsFilter, setPointsFilter] = useState(true)

  const HandleLongPress = ({nativeEvent}) => {
    setVisibilityFilter('new_punto')
    setPuntoTemp(nativeEvent.coordinate)
    setVisibility(true)
  }
  const HandleChangeText = (text) => {
    setNombre(text)
  }
  const HandleLista = () => {
    setVisibilityFilter('all_puntos')
    setVisibility(true)
  }
  const HandleSubmit = () => {
    const newPuntos = puntos.concat({coordinate: puntoTemp, name: nombre})
    setPuntos(newPuntos)
    setVisibility(false)
    setNombre('')
  }
  const TogglePointsFilter = () => setPointsFilter(!pointsFilter)
  
  return (
    <View style={styles.container}>
      <Map onLongPress={HandleLongPress} puntos={puntos} pointsFilter={pointsFilter} />
      <Panel onPressLeft={HandleLista} textLeft="lista" TogglePointsFilter={TogglePointsFilter} />
      <Modal visibility={visibility}>
        {visibilityFilter === 'new_punto'
        ?
          <View style={styles.form}>
            <Input title="Nombre: " placeholder="Nombre dl punto" onChangeText={HandleChangeText} />
            <Button style={styles.boton} title="Aceptar" onPress={HandleSubmit} />
          </View>
        :
          <List closeModal={() => setVisibility(false)} puntos={puntos} />
        }
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    padding: 10
  },
  form: {
    padding: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
