
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
            text: input,
            isActive: props.isActive
        });
        setInput(''); 

        // // let data = {proj_name: 'trader joes', task_item:input, email:props.email, order_id: '1', isActive: props.isActive, assignee: props.email}
        // let data = {proj_name: projName, task_item:input, email:props.email, order_id: props.id, isComplete: props.isComplete, assignee: props.email, favourites: props.favs}
        // fetch('/projdet',{method: "POST",  body: JSON.stringify(data),  headers: {
        //   'Content-Type': 'application/json'}} )
        // .then(response => response.json())
        // .then(data => console.log(data));
      
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

function Todo({todos, completeTodo, removeTodo, updateTodo, email, isActive}) {
    const [edit, setEdit] = React.useState({
        id: null,
        value: '',
        isActive: true
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: '',
            isActive: true
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
         {todo.isActive}
        </div>
        <div className='icons'>
            <i class="far fa-times-circle" onClick={() => removeTodo(todo.id)}></i>
            <i class="fas fa-pen-square"onClick={() => setEdit({ id: todo.id, value: todo.text, isActive: todo.isActive })}></i>
        </div>
        </div>
    ));
};
// let order_id = 0
function TodoList({email}) {
    const [todos, setTodos] = React.useState([]);
    const [isActive, setIsActive] = React.useState(true); 
    
    
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
          }
    

        const newTodo = [todo, ...todos];
        setTodos(newTodo);
        console.log(todo, ...todos);
        // let order_id = order_id + 1
        // setIsActive(true)  
    
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return todo;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item )));
        console.log('*****update todo is running******')
        let data ={email:emailFromStorage, proj_name:'trader joes', task_item: newValue.text, assignee:emailFromStorage, order_id: todoId, isComplete: 't'}
        fetch('/eproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data))
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !==id);
        console.log('*****remove todo is running******')
        let data ={email:emailFromStorage, proj_name:'trader joes', assignee:emailFromStorage, order_id: id, isComplete: 't'}
        fetch('/rproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data))
        setTodos(removedArr);
        // isActive = 'f'
        // setIsActive(false) 
    }
     
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
            console.log('*****complete todo is running******')
            let data ={email:emailFromStorage, proj_name:'costco', assignee:emailFromStorage, order_id: id, isComplete: todo.isComplete}
            fetch('/cproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
                'Content-Type': 'application/json'}} )
            .then(response => response.json())
            .then(data => console.log(data))
            setIsActive(false) 
          }
          return todo;
        });
        
        setTodos(updatedTodos);
        
        // isActive = 'f'
      };


    return(
        <div>
            <h1>what's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo}  email={email} isActive={isActive}/>
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} isActive={isActive}/>
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
  
  