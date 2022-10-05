import { CheckCircle,Circle, Trash } from "phosphor-react";
import styles from './TasksToComplete.module.css'

interface TaksToCompleteProp{
    content: string
}

export function TaksToComplete({content, ...props}: TaksToCompleteProp) {

    function checkTask(){
        onCheckTask(content)

        onCountCompletes(content)
    }

    function deleteTask(){
        onDeleteTask(content)
    }

    const icon = complete? <CheckCircle size={24} weight="fill"/> : <Circle size={24}/>

    return (
        <div className={styles.taskBox}>

            
                <button onClick={checkTask} className={complete?styles.check: styles.circle}>
                        {icon}
                </button>

                <p onClick={checkTask}>{content}</p>
            

            <button onClick={deleteTask}
                    className={styles.trash}>
                    <Trash size={24} />
            </button>
        </div>
    )
}