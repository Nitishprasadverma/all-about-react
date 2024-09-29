import { useState } from "react";

const intitalItems = [
    {title: 'peretzels', id:0},
    {title: 'cripsy seaweed', id:1},
    {title:'granola bar', id:2},
]

function Menu() {
    const [items, setItems] = useState(intitalItems);
    const [selectedItem, setSelectedItem] = useState(items[0]);

    return (
<>

<h2>What's your travel snack</h2>

        <ul>

            {items.map(item =>(               <li key={item.id}
                >
                    {item.title}
                    {' '}
                    <button onClick={() =>{
                        setSelectedItem(item)
                    }}>Choose</button>

                </li>
        ))}
        </ul>

        <p>You picked {selectedItem.title}.</p>

</>
        
    )
}

export default Menu