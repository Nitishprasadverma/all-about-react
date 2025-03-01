import Show from '../show/Show';
import styles from './shows.module.css'

const Shows = (props) => {

    return (

        <section className={styles.shows}>
            <h1>{props.title}</h1>
            <div className={styles.showParent}>


            {
                props.movies.map((movie) =>{
                    return <Show movie = {movie} />
                }) 
            }

{
    console.log("Movies in Shows:", props.movies)
}
                
            </div>
        </section>
    )

}
export default Shows;