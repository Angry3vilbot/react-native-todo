import { View, Text, Modal, StyleSheet, TextInput, Pressable } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import { useTodos } from './TodoContext';

interface NewTodoModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTodoModal: React.FC<NewTodoModalProps> = ({ modalVisible, setModalVisible }) => {
    const [checked, setChecked] = React.useState('red');
    const [title, setTitle] = React.useState('');
    const { addTodo } = useTodos();

    async function createTodo() {
        if (title.length > 0) {
            const newTodo = { title, completed: false, color: checked };
            addTodo(newTodo);
            setModalVisible(!modalVisible);
        }
    }

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalContent}>
                    <Text style={{ fontSize: 20 }}>Create A New To-Do Item</Text>
                    <TextInput style={styles.modalInput} placeholder="Title" onChangeText={(value) => setTitle(value)}></TextInput>
                    <View style={styles.radioContainer}>
                        <RadioButton
                            color='red'
                            value='red'
                            status={checked === 'red' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('red')}
                        ></RadioButton>
                        <Text>Red</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <RadioButton
                            color='green'
                            value='green'
                            status={checked === 'green' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('green')}
                        ></RadioButton>
                        <Text>Green</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <RadioButton
                            color='blue'
                            value='blue'
                            status={checked === 'blue' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('blue')}
                        ></RadioButton>
                        <Text>Blue</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <RadioButton
                            color='#EEBE41'
                            value='yellow'
                            status={checked === 'yellow' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('yellow')}
                        ></RadioButton>
                        <Text>Yellow</Text>
                    </View>
                    <Pressable
                        onPress={() => createTodo()}
                        style={({ pressed }) => pressed ? { ...styles.button, ...styles.buttonPressed } : styles.button}
                        >
                        <Text style={{ fontSize: 20, color: "white" }}>Create</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        width: 300,
        height: 350,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        margin: 20,
        paddingLeft: 10,
    },
    radioContainer: {
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 100,
        height: 40,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#20a971',
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPressed: {
        backgroundColor: '#13885b',
    }
})

export default NewTodoModal