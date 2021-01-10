import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ListItems from '../Components/ListItems';

const users = [
    {id: '1', name: 'Juan'},
    {id: '2', name: 'Jose'},
]

export default ({navigation}) => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <View style={styles.container}>
            {loading ? <Text>Cargando</Text> : 
                <FlatList 
                    style={styles.listItems}
                    data={users}
                    keyExtractor={x => String(x.id)}
                    renderItem={({item}) => <ListItems onPress={() => navigation.navigate('Posts',{user_id: item.id, userName: item.name})} title={item.name} />}
                />
            }
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    listItems:{
        alignSelf: 'stretch'
    }
});