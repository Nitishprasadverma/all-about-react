
export function handledClick(){
    alert("button Clicked")
}

function Button(props ){

    return(

        <button  onClick = {props.onClick}>{props.text}</button>
    )
}
export default Button;