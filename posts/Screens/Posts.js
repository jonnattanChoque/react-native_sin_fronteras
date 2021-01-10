import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ListItems from '../Components/ListItems';

export default ({navigation}) => {
    const userId = navigation.getParam('user_id')
    const userName = navigation.getParam('userName')

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        setPosts(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <View style={styles.container}>
            {loading ? <Text>Cargando</Text> : 
                <FlatList 
                    style={styles.listItems}
                    data={posts.filter(x => x.userId === userId)}
                    keyExtractor={x => String(x.id)}
                    renderItem={({item}) => <ListItems onPress={() => navigation.navigate('Detail',{title: item.title, body: item.body, userName: userName})} title={item.title} />}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItems:{
        alignSelf: 'stretch'
    }
});