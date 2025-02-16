import FeaturedShow from '../featured-shows/FeaturedShows';
import styles from './featured.module.css'
const Featured = () => {
    return (
        <>
            <section className={styles.featured}>
                <h1 className={styles.sectionTitle}>Hot Right Now </h1>

                <div className={styles.shows}>
                   <FeaturedShow/>
                   <FeaturedShow/>
                   <FeaturedShow/>
                </div>
            </section>
        </>
    )
}

export default Featured;