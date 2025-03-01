import FeaturedShow from '../featured-shows/FeaturedShows';
import styles from './featured.module.css'
const Featured = (props) => {
    return (
        <>
            <section className={styles.featured}>
                <h1 className={styles.sectionTitle}>Hot Right Now </h1>

                <div className={styles.shows}>
                  {
                    props.movies.map((movie,id) =>{
                        return <FeaturedShow movie = { movie} />
                    })
                  }
                </div>
            </section>
        </>
    )
}

export default Featured;