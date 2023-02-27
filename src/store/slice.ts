import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { todoApi } from '../api/api'

export interface ITask {
    userId?: number
    id: string
    title: string
    completed: boolean
}

export interface ITaskList {
    tasks: Array<ITask>
    status: null | 'pending' | 'fulfilled' | 'rejected'
    error: null | unknown
}

const initialState: ITaskList = {
    tasks: [],
    status: null,
    error: null,
}

export const fetchTask = createAsyncThunk<ITask[], undefined>(
    'toDoList/fetchTodos',
    async (_, { rejectWithValue }) => {
        const response = await todoApi.getTodos(10)
        const data = response.data
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue('Server Error')
        }
        return data
    }
)

export const deleteTask = createAsyncThunk<string, string>(
    'toDoList/deleteTask',
    async (id, { rejectWithValue }) => {
        const response = await todoApi.deleteTodos(id)
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue('Server Error')
        }
        return id
    }
)

export const changeStatus = createAsyncThunk<ITask, { id: string; completed: boolean }>(
    'toDoList/changeStatus',
    async ({ id, completed }, { rejectWithValue }) => {
        const response = await todoApi.changeStatus(id, !completed)
        const data = response.data
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue('Server Error')
        }
        return data
    }
)

const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

export const taskSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTask.pending, state => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.tasks = action.payload
            })
            .addCase(deleteTask.pending, state => {
                state.error = null
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.tasks = state.tasks.filter(task => task.id !== action.payload)
            })
            .addCase(changeStatus.pending, state => {
                state.error = null
            })
            .addCase(changeStatus.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        task.completed = action.payload.completed
                    }
                    return task
                })
            })
            .addMatcher(isError, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
            })
    },
})

export const taskAction = taskSlice.actions
export const taskReducer = taskSlice.reducer
