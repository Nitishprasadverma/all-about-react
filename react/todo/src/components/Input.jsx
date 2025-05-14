import { useRef } from "react";

const Input = ({ addTodo }) => {
    const inputRef = useRef();

    const handleAdd = () => {
        const task = inputRef.current.value.trim();

        if (task !== "") {
            addTodo(task);
            inputRef.current.value = " ";
        }
    };


    return (

        <div className="flex justify-center my-8 ">

            <div className=" bg-white p-2 rounded-md flex0">
                <input
                    ref={inputRef}
                    placeholder="Learn useRef"
                    className="px-4 py-2 rounded-1-md text-black w-64 outline-none"

                />

                <button className="bg-purple-700 ml-2 px-6 py-2 rounded-r-md hover:bg-purple-800 transition-all"
                    onClick={handleAdd}
                >
                    Add
                </button>
            </div>


        </div>
    )
}


export default Input