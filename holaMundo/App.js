import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Texto = (props) => {
  const { propTexto, children, style } = props;
  const [texto, setPropTexto] = useState('Hola a todos')
  const actualizarTexto = () =>{
    setPropTexto('Hola a todos presionado')
  }

  return(
    <Text style={[styles.text, style]} onPress={actualizarTexto}>Hola mundo desde mi primer proyecto {propTexto}{children} {texto}</Text>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Texto propTexto={'React-native'} style={styles.blue} />
      <Texto style={styles.red}></Texto>
      <Texto style={styles.green}>Chao PHP</Texto>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color: 'pink',
    fontSize: 24,
    height: 120,
    width: 150
  },
  red:{
    flex: 1,
    backgroundColor: 'red'
  },
  green:{
    flex: 2,
    backgroundColor: 'green'
  },
  blue:{
    flex: 3,
    backgroundColor: 'blue'
  },
  container: {
    flex: 1,
    flexDirection: 'column',// row-reverse, column, column-reverse,
    backgroundColor: '#fff',
    alignItems: 'flex-start',//flex-end, center, baseline, stretch
    justifyContent: 'space-evenly',//al usar flex en todos, no se nota esta propiedad
  },
});
