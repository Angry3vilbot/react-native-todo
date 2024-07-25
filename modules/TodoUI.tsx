import { View } from 'react-native'
import React from 'react'
import TodoItem from './TodoItem'
import { useTodos } from './TodoContext'

const TodoUI= () => {
  const { todos } = useTodos()

  return (
    <View style={{ width: '100%', alignItems: "center" }}>
        {todos.map((todo, index) => (
            <TodoItem key={index} title={todo.title} completed={todo.completed} color={todo.color}/>
        ))}
    </View>
  )
}

export default TodoUI