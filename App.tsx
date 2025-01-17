import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoUI from './modules/TodoUI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import NewTodo from './modules/NewTodo';
import NewTodoModal from './modules/NewTodoModal';
import { TodoProvider } from './modules/TodoContext';

export default function App() {
    const [todos, setTodos] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        const fetchTodos = async () => {
            const todos = await AsyncStorage.getItem('todos');
            if (todos) {
                setTodos(JSON.parse(todos));
            }
            else {
                setTodos([]);
            }
        }
        fetchTodos();
    }, [])

    return (
        <TodoProvider>
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <Text style={styles.titleText}>To-Do List</Text>
                </View>
                <TodoUI/>
                <View style={styles.newButtonContainer}><NewTodo modalVisible={modalVisible} setModalVisible={setModalVisible} /></View>
                <NewTodoModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                <StatusBar style="auto" />
            </View>
        </TodoProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    upperContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20a971',
        width: '100%',
        height: 100,
        fontWeight: 900,
    },
    titleText: {
        fontWeight: '900',
        fontSize: 36,
        color: '#eefbf4',
    },
    newButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
});
