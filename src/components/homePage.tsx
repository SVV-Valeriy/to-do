import React from 'react'
import { Tasks } from './tasks'
import { useFetchTask } from '../hooks/async'

export const HomePage = () => {
    const { tasks, isError, isLoading } = useFetchTask()

    const taskElement = tasks.map(({ id, title, completed }) => (
        <Tasks key={id} id={id} title={title} completed={completed} />
    ))

    return (
        <div>
            {isError ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : tasks ? (
                <>
                    <h1>Список задач</h1>
                    <ul> {taskElement}</ul>
                </>
            ) : null}
        </div>
    )
}
