import React from "react";

import styles from './channels.module.css';
import channel1 from '../../assets/channel1.jpg'
import channel2 from '../../assets/channel2.png'
import channel3 from '../../assets/channel3.jpg'
import channel4 from '../../assets/channel4.jpg'
import channel5 from '../../assets/channel5.jpg'
import channel6 from '../../assets/channel6.jpg'
import channel7 from '../../assets/channel7.jpg'


const Channels = () =>{
    return (
        <>
        
        <div className= {styles.channels}>
            <img src={channel1} alt="" />
            <img src={channel2} alt="" />
            <img src={channel3} alt="" />
            <img src={channel4} alt="" />
            <img src={channel5} alt="" />
            <img src={channel6} alt="" />

            <img src={channel7} alt="" />
        </div>
        
        </>
    )
}

export default Channels;