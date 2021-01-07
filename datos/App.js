import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, SectionList, StyleSheet, Text, TextInput, Touchable, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [text, setText] = useState('Pruebita')
  const [submit, setSubmit] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(data => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  const touchable = () => {
    setSubmit(text)
    alert("Texto cambiado")
  }

  if (loading){
    return <View style={styles.center}><Text>Cargando...</Text></View>
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <Text>campo de texto: {submit}</Text>
        <FlatList 
          data={users}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
          keyExtractor={item => String(item.id)}
        />
        <SectionList 
          sections={[
            {
              title: 'Grupo 1',
              data: [
                {key: '1', name: 'Jon'},
                {key: '2', name: 'Juan'},
                {key: '3', name: 'Maria'},
                {key: '4', name: 'Luis'},
                {key: '5', name: 'Pedro'}
              ]
            },
            {
              title: 'Grupo 2',
              data: [
                {key: '6', name: 'Jon'},
                {key: '7', name: 'Juan'},
                {key: '8', name: 'Maria'},
                {key: '9', name: 'Luis'},
                {key: '10', name: 'Pedro'}
              ]
            },
            {
              title: 'Grupo 3',
              data: [
                {key: '11', name: 'Jon'},
                {key: '12', name: 'Juan'},
                {key: '13', name: 'Maria'},
                {key: '14', name: 'Luis'},
                {key: '15', name: 'Pedro'}
              ]
            }
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.section}>{section.title}</Text>}
        />
        <TextInput style={styles.input} placeholder="Escribe acá" onChangeText={txt => setText(txt) } defaultValue={text} />
        <Button title="Presiona" onPress={touchable} />
        <TouchableHighlight underlayColor={'#999'} activeOpacity={0.4} onPress={touchable}>
          <Text>Presioname</Text>
        </TouchableHighlight>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#00f')} onPress={touchable}>
          <View style={styles.view}><Text>Presionam 2</Text></View>
        </TouchableNativeFeedback>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={touchable}>
          <View style={styles.view}><Text>Presionam 2</Text></View>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  center:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 40,
    borderBottomColor: '#ccc',
    borderWidth: 1,
    width: '100%'
  },
  view:{
    height: 40,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  TouchableOpacity:{
    backgroundColor: '#EEE'
  },
  ScrollView: {
    width: '100%'
  },
  item:{
    padding: 10,
    fontSize: 22,
    height: 50,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  section:{
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2
  }
});
