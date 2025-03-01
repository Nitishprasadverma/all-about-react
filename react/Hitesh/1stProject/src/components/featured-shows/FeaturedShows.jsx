import styles from './featured-shows.module.css'
const FeaturedShow = (props) => {
    return (
        <>
            <div className={styles.featuredShow}>
                <img src={props.movie.imageUrl} alt="show" />

                <div className={styles.movieTitle}>{props.movie.name}</div>
            </div>

        </>
    )

}

export default FeaturedShow;