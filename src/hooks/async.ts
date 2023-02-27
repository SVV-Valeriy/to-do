import { useAppDispatch, useAppSelector } from './redux'
import { fetchTask } from '../store/slice'
import { useEffect } from 'react'

export const useFetchTask = () => {
    const dispatch = useAppDispatch()
    const { status, tasks } = useAppSelector(state => state.task)
    useEffect(() => {
        if (!status) {
            dispatch(fetchTask())
        }
    }, [status, dispatch])

    const isUninitialized = status === null
    const isLoading = status === 'pending' || null
    const isError = status === 'rejected'
    const isSuccess = status === 'fulfilled'

    return { tasks, isUninitialized, isLoading, isError, isSuccess }
}
