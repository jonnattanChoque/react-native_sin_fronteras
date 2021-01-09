import { StatusBar } from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

const Logo = () => <Text>Mi logo</Text>

const homeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Detalle" onPress={() => navigation.navigate('Detail', {id: 2})} />
      <Button title="abrir menu" onPress={() => navigation.openDrawer()} />
      <StatusBar style="auto" />
    </View>
  )
}
homeScreen.navigationOptions = {
  drawerIcon: ({tintColor}) => {
    return <Ionicons name='ios-information-circle' size={16} color={tintColor} />
  },
  title: 'Home',
  headerTitle: <Logo />,
  headerRight: (
    <Button title="boton" onPress={() => alert("hola")} />
  )
  // headerStyle: {
  //   backgroundColor: '#ffeecc',
  // },
  // headerTintColor: '#22a',
  // headerTitleStyle: {
  //   fontWeight: 'bold'
  // }
}

const detailScreen = ({navigation}) => {
  const [cont, setCont] = useState(0)
  const incrementar = () => setCont(cont + 1)

  useEffect(() => {
    navigation.setParams({incrementar})
  }, [cont])

  const nombre = navigation.getParam('nombre', 'Jose')
  return(
    <View style={styles.container}>
      <Text>Esta es una pantalla de detalle: {nombre} {cont}</Text>
      <Button title="Cambiar título" onPress={() => navigation.setParams({title: 'usuario 1'})} />
      <Button title="Abrir modal" color='#444' onPress={() => navigation.navigate('myModal')} />
      <Button title="Volver" onPress={() => navigation.goBack()} />
      <StatusBar style="auto" />
    </View>
  )
}
detailScreen.navigationOptions = ({navigation, navigationOptions}) => {
  return {
    title: navigation.getParam('title', 'Cargando...'),
    headerRight: (
      <Button title="presiona" color='#444' onPress={navigation.getParam('incrementar')} />
    ),
    headerStyle: {
      backgroundColor: '#f00'
    }
  }
}

//en vez de createBotonTabNavigator se pude usar createStackNavigator o createDrawerNavigator o createSwitchNavigator
const AppNavigator = createSwitchNavigator({
  Home: {
    screen: homeScreen
  },
  Detail: {
    screen: detailScreen
  }
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      const {routeName} = navigation.state
      let iconName
      if (routeName === 'Home'){
        iconName = `ios-information-circle${focused ? '' : '-outline'}`
      }else{
        iconName = `ios-options`
      }

      return <Ionicons name={iconName} size={16}/>
    },
    tabBarOptions:{
      activeTintColor: '#cfc',
      inactiveTintColor: 'black',
      labelStyle:{
        fontSize: 20
      },
      style:{
        backgroundColor: '#fff'
      },
    },
    headerStyle: {
      backgroundColor: '#fec'
    },
    headerTintColor: '#555',
    headerTitleStyle: {
      fontWeight: '900'
    }
  })
})

const RootStack = createStackNavigator({
  Main: AppNavigator,
  myModal: () => <Text>Mi modal</Text>
}, {
  mode: 'modal',
  headerMode: 'none'
})

export default createAppContainer(RootStack)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
