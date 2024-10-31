import { useState } from "react";
// import "./styles.css";
export default function Clock(props) {
  return (
    <h1 style={{color:props.color}}
   
    >{props.time}</h1>
  )
}


