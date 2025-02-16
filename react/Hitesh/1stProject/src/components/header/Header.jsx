import React from "react";
import styles from './header.module.css'
import JCLogo from '../../assets/jc_logo_v2.svg'

import Cron from '../../assets/crown.svg'
import searchIcon from '../../assets/ic_search.svg'
import voiceSearch from '../../assets/voice-search.svg'
import jioIcon from '../../assets/jio-logo.png'


let navLinks = ["Home", "Sports", "Movie", "TV Shows", "More"];
const Header = () => {
    return (
        <>

            <header className={styles.header}>
                <nav className={styles.navigation}>
                    <div className={styles.logo}>
                        <img src={JCLogo} />
                        <div className={styles.premium}> <img src={Cron} alt="" /> <p>Go Premium</p></div>
                    </div>

                    <ul className={styles.navLinks}>
                        {navLinks.map((Link) => {
                            return <li className={styles.navLink}>{Link}</li>
                        })}
                    </ul>
                </nav>

                <div className={styles.search}>
                        <div className={styles.searchBox}>
                            <div className={styles.headerIcon}>
                             <img  src={searchIcon} alt="" />
                            </div>
                            
                            <input type="text"  className={styles.searchInput} placeholder="Movies,Shows and More"/>
                            <div className={styles.headerIcon} >
                            <img src={voiceSearch} alt="" />
                            </div>
                          
                        </div>
                        <img className= {styles.userIcon} src= {jioIcon} alt="" />

                </div>
            </header>
        </>
    )
}

export default Header;