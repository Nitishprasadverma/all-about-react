const TodoCard = ({index,todo, updateStatus, removeTodo}) => {

    return (
        <div className="bg-[#1f2235] p-5 rounded-xl flex flex-col gap-2 shadow-md">

            <h3 className=" font-semibold text-lg text-white"> 
                {index + 1}. 
                <span className="capaitalize">{todo.title}</span>
            </h3>

            <p className="text-gray-300">Status: <span className="lowercase">{todo.status}</span> </p>

            <button
            onClick={() => updateStatus(index)}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all  py-2 rounded-md text-white"
            >
                Update Status 
            </button>

            <button
            onClick={() => removeTodo(index)}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all  py-2 rounded-md text-white"
            >
                Remove
            </button>
        </div>
    )
}

export default TodoCard;