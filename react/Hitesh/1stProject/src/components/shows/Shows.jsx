import Show from '../show/Show';
import styles from './shows.module.css'

const Shows = () => {

    return (

        <section className={styles.shows}>
            <h1>Hindi Movies</h1>
            <div className={styles.showParent}>

                <Show />
                <Show />
                <Show />
                <Show />
                <Show />
                <Show />
            </div>
        </section>
    )

}
export default Shows;