import { useState } from "react";

const intitalItems = [
    { title: 'peretzels', id: 0 },
    { title: 'cripsy seaweed', id: 1 },
    { title: 'granola bar', id: 2 },
]

// function Menu() {
//     const [items, setItems] = useState(intitalItems);
//     const [selectedItem, setSelectedItem] = useState(items[0]);

//     return (
// <>

// <h2>What's your travel snack</h2>

//         <ul>

//             {items.map(item =>(               <li key={item.id}
//                 >
//                     {item.title}
//                     {' '}
//                     <button onClick={() =>{
//                         setSelectedItem(item)
//                     }}>Choose</button>

//                 </li>
//         ))}
//         </ul>

//         <p>You picked {selectedItem.title}.</p>

// </>

//     )
// }


// editable menu function
//editiable menu list but not automatically changes in para
// function Menu() {
//     const [items, setItmes] = useState(intitalItems);
//     const [selectedItem, setSelectedItem] = useState(items[0]);

//     function handleItemChange(id, e) {
//         setItmes(items.map(item => {
//             if (item.id === id) {
//                 return {
//                     ...item,
//                     title: e.target.value
//                 }
//             }
//             else {
//                 return item;
//             }
//         }))
//     }

//     return (
//         <>
//             <h2>What's your travel snack?</h2>

//             <ul>

//                 {items.map((item, index) => (
//                     <li key={item.id}>
//                         <input
//                             value={item.title}
//                             onChange={e => {
//                                 handleItemChange(item.id, e)
//                             }}
//                         />
//                         {' '}
//                         <button onClick={() => {
//                             setSelectedItem(item);
//                         }} >Choose</button>

//                     </li>
//                 ))}
//             </ul>

//             <p>You Picked {selectedItem.title}</p>

//         </>
//     )
// }

function Menu(){
    const [items, setItems] = useState(intitalItems);
    const [selectedId, setSelectedId] = useState(0);

    const selectedItem = items.find(item =>
        item.id === selectedId
      );

    function handleItemChange(id, e) {
        setItems(items.map(item =>{
            if(item.id === id){
                return {
                    ...item,
                    title: e.target.value,
                }
            }
            else return item;
        }))
    }

    return (
        <>
        <h2>What's your travel snack?</h2>

        <ul>

            {items.map((item,index) => (
                <li key={item.id}>
                    <input
                    value={item.title}
                    onChange={e =>{
                        handleItemChange(item.id, e)
                    }}
                    />
                    {' '}

                    <button onClick={() =>{
                        setSelectedId(item.id)
                    }}>Choose</button>  
                </li>
            ))}
        </ul>
        <p>You picked {selectedItem.title}.</p>
        </>
    )
}
export default Menu