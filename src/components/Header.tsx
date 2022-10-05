import todoLogo from '../assets/rocket.svg'
import styles from './Header.module.css'

export function Header(){

    return(
        <header className={styles.headerContainer}>
        <img src={todoLogo} alt="Logo todo"/>
        <div>
            <strong>to</strong>
            <strong>do</strong>
        </div>
</header>
    )

}