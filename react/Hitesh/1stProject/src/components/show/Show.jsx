
import styles from './show.module.css'
const Show = (props) => {
    return (
        <>

            <div className={styles.show}>

                <img src= {props.movie.imageUrl} alt="" />
                <div className= {styles.movieName}>{props.movie.name}</div>

            </div>

        </>
    )
}

export default Show
