import React, { useState } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import { connect} from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import ListItems from '../components/ListItems';
import Input from '../components/Input';
import { complete, saveTodo } from './reducers/todos';

const App = ({data, complete, submit}) => {
    const [value, setValue] = useState('')

    const handleChange = (val) => {
        console.log(val)
        setValue(val)
    }
    const handleSubmit = () => {
        submit(value)
        setValue('')
    }
    return (
        <View style={styles.container}>
            <Input onSubmit={handleSubmit} onChange={handleChange} value={value} />
            <FlatList 
                style={styles.lista}
                data={data}
                keyExtractor={x => String(x.id)}
                renderItem={({item}) => <ListItems onPress={() => complete(item.id)} completed={item.completed} desc={item.desc} /> }
            />
        <StatusBar style="auto" />
        </View>
    )
}

const mapStateToProps = state => {
    return {data: state.todos}
}

const mapDispatchToProps = (dispatch) => ({
    complete: (id) => dispatch(complete(id)),
    submit: (val) => dispatch(saveTodo(val))
})

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    lista:{
        alignSelf: 'stretch'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App)