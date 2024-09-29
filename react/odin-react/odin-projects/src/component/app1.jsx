import { useState } from "react";
import { DataList } from "../data/data";




export default function Gallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

let hasPrev = index > 0;
let hasNex = index <DataList.length - 1;

function handlePrev (){
    if(hasPrev){
        setIndex(index - 1);
    }
}

    function handleClick() {
        if(hasNex){
            setIndex(index + 1);
        }
        
    }
    function handleMore() {
        setShowMore(!showMore);
    }
    let data = DataList[index]
    return (
        <>

        <button  onClick={handlePrev}
        disabled = {!hasPrev}>Previous</button>
            <button onClick={handleClick} disabled = {!hasNex}>
                Next

            </button>

            <h2>
                <i>{data.name}</i>
                by {data.artist}
            </h2>

            <h3>
                ({index + 1} of {DataList.length})
            </h3>
            <button onClick={handleMore}

                style={{
                    display: "block",
                    color: "white",
                    background: "black"
                }}

            >
                {showMore ? 'Hide' : 'Show'} details
            </button>
            {showMore && <p>{data.description}</p>}
            <img src={data.url} alt={data.alt} />


        </>
    )
}



