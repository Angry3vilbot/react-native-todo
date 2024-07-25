import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
    title: string;
    completed: boolean;
    color: string;
}

interface TodoContextType {
    todos: Todo[];
    addTodo: (newTodo: Todo) => void;
    updateTodos: (title: string, completed: boolean) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    React.useEffect(() => {
        const fetchTodos = async () => {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        }
        fetchTodos();
    }, [])

    React.useEffect(() => {
        const uploadTodos = async () => {
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
        }
        uploadTodos();
    }, [todos])

    const addTodo = (newTodo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    const updateTodos = async (title: string, completed: boolean) => {
        const index = todos.findIndex(todo => todo.title === title);
        const newTodos = [...todos];
        newTodos[index].completed = completed;
        await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    }

    return <TodoContext.Provider value={{ todos, addTodo, updateTodos }}>{children}</TodoContext.Provider>;
}

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
}