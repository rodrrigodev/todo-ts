
import { TaksToComplete } from './TasksToComplete'
import { PlusCircle } from 'phosphor-react'
import clipboard from '../assets/clipboard.svg'

import { v4 as uuidv4 } from 'uuid';
import styles from './Tasks.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react';
interface Props {
    content: string;
    complete: boolean;
}

export function Tasks() {

    const tasksIsEmpty = localStorage.getItem("@todo-ts:tasks-1.0.0")

    const [allTasks, setTasks] = useState<Props[]>(tasksIsEmpty ? JSON.parse(tasksIsEmpty) : [])
    const [newTask, setNewTask] = useState('')
    const [totalTasks, setTotalTasks] = useState(allTasks ? allTasks.length : 0)
    const [tasksCompletes, setTasksCompletes] = useState(allTasks ? allTasks.filter((task)=>{ return task.complete !== false }).length : 0)

    function createTask(event: FormEvent) {
        event.preventDefault()

        setTasks([{ content: newTask, complete: false }, ...allTasks])
        setNewTask('')
        setTotalTasks(allTasks.length + 1)
    }

    function newTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewTask(event.target.value)
    }

    function newTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    interface tasks {
        content: string;
        complete: boolean
    }

    function checkTask(task: string) {
        const tasks = allTasks.filter(itens => itens.content !== task)
        const changeState = allTasks.find(item => item.content === task)!
        setTasks([...tasks, { content: changeState.content, complete: !changeState.complete }])
    }

    function deleteTask(task: string) {
        const tasksWithoutDeleted = allTasks.filter(item => item.content !== task)
        const findTaskToRemoveFromComplete = allTasks.find(item => item.content === task)!
        setTasks(tasksWithoutDeleted)
        setTotalTasks(totalTasks > 0 ? totalTasks - 1 : 0)
        setTasksCompletes(findTaskToRemoveFromComplete.complete ? tasksCompletes - 1 : tasksCompletes)
    }

    function countCompletes(task: string) {
        const taskState = allTasks.find(item => item.content === task)!
        const actualStage = taskState.complete
        const tasks = allTasks.filter(itens => itens.complete)
        const tasksCompletesResult = actualStage ? tasks.length - 1 : tasks.length + 1
        setTasksCompletes(tasksCompletesResult)
    }

    const newTaskEmpty = newTask.length === 0

    useEffect(() => {
        
            const todoTs = JSON.stringify(allTasks)
            localStorage.setItem("@todo-ts:tasks-1.0.0", todoTs)
        
    }, [allTasks])

    return (

        <div>
            <form onSubmit={createTask} className={styles.formContainer}>
                <textarea
                    onChange={newTaskChange}
                    placeholder='Adicione uma nova tarefa'
                    name='newTask'
                    value={newTask}
                    onInvalid={newTaskInvalid}
                    required
                />

                <div>
                    <button type='submit' disabled={newTaskEmpty}>
                        Criar <PlusCircle size={16} />
                    </button>
                </div>
            </form>

            <section className={styles.tasksContainer}>

                <header className={styles.tasksTotal}>

                    <div className={styles.tasksCreated}>
                        <strong>Tarefas criadas</strong>
                        <span>{totalTasks}</span>
                    </div>

                    <div className={styles.tasksCompleted}>
                        <strong>Tarefas Concluidas</strong>
                        <span>{tasksCompletes} de {totalTasks}</span>
                    </div>

                </header>

                {
                    allTasks.length ?
                        <div className={styles.taskItem}>

                            {allTasks.map(task => {
                                return (
                                    <TaksToComplete
                                        key={uuidv4()}
                                        content={task.content}
                                        complete={task.complete}
                                        onCheckTask={checkTask}
                                        onDeleteTask={deleteTask}
                                        onCountCompletes={countCompletes}
                                    />
                                )
                            })}
                        </div>
                        :
                        <div className={styles.noTasksContainer}>
                            <img className={styles.noTaskImg} src={clipboard} alt="Caderno de anotação de tarefas" title='Caderno de anotação' />
                            <p className={styles.noTaskPara1}>Você ainda não tem tarefas cadastradas</p>
                            <p className={styles.noTaskPara2}>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                }



            </section>
        </div>
    )
}