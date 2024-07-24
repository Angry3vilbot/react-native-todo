import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const NewTodo = () => {
    const createNewTodo = () => {
        
    }

    return (
        <View>
            <Pressable
                onPress={createNewTodo}
                accessibilityLabel="Add new todo item"
                style={styles.button}
            >
                <Text style={{color: "#eefbf4", fontSize: 40, lineHeight: 60, marginTop: -6}}>+</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#20a971',
        alignItems: "center",
        justifyContent: "center",
    }
})

export default NewTodo