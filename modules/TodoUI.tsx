import { View, Text } from 'react-native'
import React from 'react'
import TodoItem from './TodoItem'

interface TodoUIProps {
    todos: { title: string, completed: boolean }[];
}

const TodoUI: React.FC<TodoUIProps> = ({ todos }) => {
  return (
    <View>
        {todos.map((todo, index) => (
            <TodoItem key={index} title={todo.title} completed={todo.completed}/>
        ))}
    </View>
  )
}

export default TodoUI