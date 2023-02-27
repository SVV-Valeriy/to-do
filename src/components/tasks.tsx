import React, { FC } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { changeStatus, deleteTask } from '../store/slice'

interface Props {
    id: string
    title: string
    completed: boolean
}

export const Tasks: FC<Props> = ({ id, title, completed }) => {
    const dispatch = useAppDispatch()

    const handler = () => {
        dispatch(deleteTask(id))
    }

    const handlerChange = () => {
        dispatch(changeStatus({ id, completed }))
    }

    return (
        <li key={id}>
            <input onChange={handlerChange} type={'checkbox'} checked={completed} />
            <p>{title}</p>
            <button onClick={handler}>delete</button>
        </li>
    )
}
