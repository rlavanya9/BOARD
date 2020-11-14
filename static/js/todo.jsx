
function TodoForm(props) {
    const [input, setInput] = React.useState(props.edit ? props.edit.value: '')

    const inputRef = React.useRef(null)

    React.useEffect(() => {
        inputRef.current.focus()
    });

    const handleChange = (evt) => {
        setInput(evt.target.value)

    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });
        setInput('');   
    };
    

    return(
        <form className='todo-form' onSubmit={handleSubmit}>
            {props.edit ? (
            <React.Fragment>
            <input type='text' placeholder='Update an item' value={input}
            name='text' className='todo-input'
            onChange={handleChange} ref={inputRef}/>
            <button className='todo-button'>Update</button></React.Fragment>):
            (<React.Fragment>
            <input type='text' placeholder='Add a todo' value={input}
            name='text' className='todo-input'
            onChange={handleChange} ref={inputRef}/>
            <button className='todo-button'>Add todo</button></React.Fragment>)}
        </form>
    )
}

function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = React.useState({
        id: null,
        value: ''
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    };

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} 
        key={index}>
        <div key={todo.id} onClick={() => completeTodo(todo.id)}> 
         {todo.text}
        </div>
        <div className='icons'>
            <i class="far fa-times-circle" onClick={() => removeTodo(todo.id)}></i>
            <i class="fas fa-pen-square"onClick={() => setEdit({ id: todo.id, value: todo.text })}></i>
        </div>
        </div>
    ));
};

function TodoList() {
    const [todos, setTodos] = React.useState([]);
    
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
          }
    

        const newTodo = [todo, ...todos];
        setTodos(newTodo);
        console.log(todo, ...todos);
    
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item )));
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !==id);
        setTodos(removedArr);
    }
     
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
          }
          return todo;
        });
        setTodos(updatedTodos);
      };


    return(
        <div>
            <h1>what's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
        
    );
};




// function TodoAll() {
//     return (
//       <div className="todo-app"> 
//         <TodoList />
//       </div>
//     );
//   }
  
  // export default App;
  
  