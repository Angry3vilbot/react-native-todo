import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface TodoItemProps {
    title: string;
    completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, completed }) => {
    const [isCompleted, setIsCompleted] = React.useState(completed);
    const onPress = () => {
        setIsCompleted(!isCompleted);
    }

    return (
        <Pressable onPress={onPress}>
            <View style={styles.mainContainer}>
                <View style={[styles.checkboxContainer, {borderColor: isCompleted ? '#20a971' : 'gray',}]}>
                    {isCompleted && (
                        <View style={styles.checkbox}>
                            <Text style={{ color: '#20a971', fontSize: 24 }}>✓</Text>
                        </View>
                    )}
                </View>
                <Text style={{ fontSize: 16 }}>{title}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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