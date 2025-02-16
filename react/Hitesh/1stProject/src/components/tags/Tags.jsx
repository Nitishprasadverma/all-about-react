import styles from './tags.module.css'
import { useState } from 'react'
const Tags = () => {

    let [tags, setTags] = useState(
        [
            "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
            "Documentary", "Drama", "Fantasy", "Family", "History", "Horror", "Reboot", "Miniseries", "Limited Series",
            "Binge-worthy"
        ]
    )
    return (

        <>

            <div className={styles.tags}>
                {
                    tags.map((tag) => {
                        return <p className={styles.tag}>{tag}</p>
                    })
                }

            </div>
        </>

    )
}

export default Tags;