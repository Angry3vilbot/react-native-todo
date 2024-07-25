import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTodos } from './TodoContext';
import { IconButton } from 'react-native-paper';

interface TodoItemProps {
    title: string;
    completed: boolean;
    color: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, completed, color }) => {
    const [isCompleted, setIsCompleted] = React.useState(completed);
    const { updateTodos, deleteTodo } = useTodos();

    const changeCheckboxState = () => {
        setIsCompleted(!isCompleted);
        updateTodos(title, !isCompleted);
    }

    const deleteTodoHandler = () => {
        deleteTodo(title);
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <Pressable onPress={changeCheckboxState}>
                <View style={[styles.mainContainer, { borderColor: color }]}>
                    <View style={[styles.checkboxContainer, { borderColor: isCompleted ? '#20a971' : 'gray', }]}>
                        {isCompleted && (
                            <View style={styles.checkbox}>
                                <Text style={{ color: '#20a971', fontSize: 24 }}>✓</Text>
                            </View>
                        )}
                    </View>
                    <Text style={{ fontSize: 16 }}>{title}</Text>
                </View>
            </Pressable>
            <IconButton
                icon="delete"
                iconColor='red'
                size={35}
                style={{ alignSelf: 'center' }}
                onPress={deleteTodoHandler}
            >

            </IconButton>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5,
        borderRadius: 3,
        borderWidth: 5,
        width: 300
    },
    checkboxContainer: {
        width: 40,
        height: 40,
        borderRadius: 3,
        borderWidth: 2,
        marginRight: 8,
    },
    checkbox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TodoItem;