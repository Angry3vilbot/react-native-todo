import React, { createContext, useContext, useState, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import notifee, { AndroidImportance, AndroidNotificationSetting, RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';

interface Todo {
    title: string
    completed: boolean
    color: string
}

interface TodoContextType {
    todos: Todo[]
    addTodo: (newTodo: Todo) => void
    updateTodos: (title: string, completed: boolean) => void
    deleteTodo: (title: string) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const checkTodoCompletion = (todos: Todo[]) => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].completed == false) {
                return false
            }
        }
        return true
    }

    React.useEffect(() => {
        const fetchTodos = async () => {
            const storedTodos = await AsyncStorage.getItem('todos')
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos))
                
            }
        }
        fetchTodos()
    }, [])

    React.useEffect(() => {
        const uploadTodos = async () => {
            await AsyncStorage.setItem('todos', JSON.stringify(todos))
            await notifee.cancelAllNotifications()
            if (todos.length > 0 && !checkTodoCompletion(todos)) {
                const settings = await notifee.getNotificationSettings();
                if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
                    const channelId = await notifee.createChannel({
                        id: 'reminder',
                        name: 'Reminder Channel',
                        importance: AndroidImportance.HIGH,
                    });
                    const trigger: TimestampTrigger = {
                        type: TriggerType.TIMESTAMP,
                        timestamp: Date.now() + 1000 * 60 * 60,
                        repeatFrequency: RepeatFrequency.HOURLY,
                    }
                    try {
                        await notifee.createTriggerNotification({
                            title: "To-Do List Reminder",
                            body: "You have incompleted to-do items!",
                            android: {
                                channelId,
                                pressAction: {
                                    id: 'reminder',
                                },
                            }
                        }, trigger)
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    await notifee.openAlarmPermissionSettings();
                }
            }
        }
        uploadTodos()
        
    }, [todos])

    const addTodo = (newTodo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo])
    }

    const updateTodos = async (title: string, completed: boolean) => {
        const index = todos.findIndex(todo => todo.title === title)
        const newTodos = [...todos]
        newTodos[index].completed = completed
        await AsyncStorage.setItem('todos', JSON.stringify(newTodos))
    }

    const deleteTodo = async (title: string) => {
        const newTodos = todos.filter(todo => todo.title !== title)
        setTodos(newTodos)
    }

    return <TodoContext.Provider value={{ todos, addTodo, updateTodos, deleteTodo }}>{children}</TodoContext.Provider>
}

export const useTodos = () => {
    const context = useContext(TodoContext)
    if (context === undefined) {
        throw new Error('useTodos must be used within a TodoProvider')
    }
    return context
}