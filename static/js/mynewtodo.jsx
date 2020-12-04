const styled = window.styled;
const css = window.css;

const FormH1 = styled.h1`
margin-bottom: 40px;
color: #fff;
font-size: 20px;
font-weight: 400;
text-align: center;
`;

const FormLabelN = styled.label`
margin-top: 5rem;
margin-bottom: 8px;
padding-left: 50px; 
font-size: 20px;
color: #fff;
`;

const FormLabelD = styled.label`
margin-top: 5rem;
// margin-bottom: 8px;
padding-left: 50px;
margin-right: 16px; 
font-size: 20px;
color: #fff;
`;

const FormLabelC = styled.label`
margin-top: 5rem;
margin-bottom: 8px;
padding-left: 16px; 
font-size: 20px;
color: #fff;
`;

const FormInputD = styled.input`
margin-top: 5rem;
padding: 16px 16px;
margin-bottom: 32px;
margin-left:16px;
border: none;
border-radius: 4px;
border: 2px solid #149fff;
`;

const FormInputN = styled.input`
margin-top: 5rem;
padding: 16px 16px;
// margin-bottom: 32px;
margin-left:16px;
border: none;
border-radius: 4px;
border: 2px solid #149fff;
`;

const FormInputC = styled.input`
margin-top: 5rem;
padding: 16px 16px;
// margin-bottom: 32px;
margin-left: 32px;
border: none;
border-radius: 10px;
zoom:2;
border: 2px solid #149fff;
// width: 25px; 
// height: 25px;
`;

const FormButtonN = styled.button`
margin-top: 5rem;
margin-left: 50px;
background: #01bf71;
padding: 16px 0;
border: None;
border-radius: 10px;
color: #fff;
font-size: 20px;
cursor: pointer;
`;
const Backgroundb = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

const Backgrounda = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useEffect = React.useEffect
const useCallback = React.useCallback
const useRef = React.useRef
const useState = React.useState

const NewTask = ({ showTask, setShowTask, email, projName, labelName, emailFromStorage,dueDate,fav, assignName}) => {
    const TaskRef = React.useRef();

    
    const closeTask = e => {
      if (TaskRef.current === e.target) {
        setShowTask(false);
      }
    };
  
    const keyPress = useCallback(
      e => {
        if (e.key === 'Escape' && showTask) {
          setShowTask(false);
          console.log('I pressed');
        }
      },
      [setShowTask, showTask]
    );
  
    useEffect(
      () => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
      },
      [keyPress]
    );
    const openTask = () => {
        setShowModalt(prev => !prev);
      };
  
    return (
      <React.Fragment>
        {showTask ? (
          <Backgroundb onClick={closeTask} ref={TaskRef}>
              <NewTodoList showTask={showTask} email={email} projName={projName} labelName={labelName} dueDate={dueDate} fav={fav} assignName={assignName}/>
          </Backgroundb>
        ) : null}
      </React.Fragment>
    );
  };
  


function NewProjContainer() {
    const [allProj, setAllProj] = React.useState([{}]);
    const [email, setEmail] = React.useState('')
    const emailFromStorage = JSON.parse(localStorage.getItem('email'));
    const [showTask, setShowTask] = React.useState(false);
    const [projName, setProjName] = React.useState('')
    const [labelName, setLabelName] = React.useState('')
    const [assignName, setAssignName] = React.useState('')
    const [fav, setFav] = React.useState(false)
    const [dueDate, setDueDate] = React.useState('2020-12-09')
    const history = useHistory()
  

    const openTask = (project) => {
        setShowTask(prev => !prev);
        setProjName(projName);
        setLabelName(labelName);
        setAssignName(assignName);
        setFav(fav);
        setDueDate(dueDate);
        };
    
    function handleProjectNameChange(evt){
    setProjName(evt.target.value)
    }
    
    function handleLabelChange(evt){
    setLabelName(evt.target.value)
    }

    function handleAssignChange(evt){
      setAssignName(evt.target.value)
      }

    function handleFavChange(evt){
    setFav(!fav) 
    }

    function handleDateChange(evt){
    let dueDate = document.querySelector('input[type="date"]');
    setDueDate(dueDate.value) 
    }
    
    function handleSubmit(evt){
      history.push('/home')
    }
    
    return <React.Fragment>
        <div style={{
          marginLeft: "15%"
        }}>
        <FormLabelN htmlFor='for'>Project Name</FormLabelN>
        <FormInputN type='text' value={projName} onChange={handleProjectNameChange} required />
        <FormLabelN htmlFor='for'>Label</FormLabelN>
        <FormInputN type='text'  value={labelName} onChange={handleLabelChange} />
        <FormInputC type='checkbox' checked={fav} onChange={handleFavChange} />
        <FormLabelC htmlFor='fav'>Add to Favourites</FormLabelC>
        <FormLabelD htmlFor='due_date'>Due Date</FormLabelD>
        <FormInputD type='date' id='due_date' value={dueDate} min='2020-12-09' onChange={handleDateChange}></FormInputD>
        <FormLabelN htmlFor='for'>Collaborator</FormLabelN>
        <FormInputN type='text' value={assignName} onChange={handleAssignChange} />
        <FormButtonN type="submit" onClick={()=> openTask(projName,labelName,fav,dueDate,assignName)}>Add items </FormButtonN>
        <FormButtonN type="submit" onClick={handleSubmit}>Done, Take me Home</FormButtonN>
        </div>
    {/* <FormButton type="submit" value='alltask' onClick={openTask}>Edit items </FormButton> */}
    <NewTask showTask={showTask} setShowTask={setShowTask} email={email} projName={projName} labelName={labelName} fav={fav} dueDate={dueDate} assignName={assignName}/> 
    
    </React.Fragment>
}




function NewProj() {

    return (
        <React.Fragment>
      <div>
        <NewProjContainer />
      </div>
      </React.Fragment>
    );
}



function NewTodoForm(props) {
    const [input, setInput] = React.useState(props.edit ? props.edit.value: '')
    const [todayProj, setTodayProj] = React.useState([{}]);
    const [email, setEmail] = React.useState('')
    const emailFromStorage = JSON.parse(localStorage.getItem('email'));

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

        // let data = {proj_name: 'trader joes', task_item:input, email:props.email, order_id: '1', isActive: props.isActive, assignee: props.email}
        // let data = {proj_name: props.projName, task_item:input, email:emailFromStorage, order_id: '1', isComplete: props.isComplete, assignee: emailFromStorage, label_name:props.labelName, favourite:props.fav, due_date:props.dueDate}
        // fetch('/projdet',{method: "POST",  body: JSON.stringify(data),  headers: {
        //   'Content-Type': 'application/json'}} )
        // .then(response => response.json())
        // .then(data => console.log(data));
      
    };
    

    return(
        <form className='new-todo-form' onSubmit={handleSubmit}>
            {props.edit ? (
            <React.Fragment>
            <input type='text' placeholder='Update an item' value={input}
            name='text' className='new-todo-input'
            onChange={handleChange} ref={inputRef}/>
            <button className='new-todo-button'>Update</button></React.Fragment>):
            (<React.Fragment>
            <input type='text' placeholder='Add a todo' value={input}
            name='text' className='new-todo-input'
            onChange={handleChange} ref={inputRef}/>
            <button className='new-todo-button'>Add todo</button></React.Fragment>)}
        </form>
    )
}

function NewTodo({todos, completeTodo, removeTodo, updateTodo, email, isActive, projName,labelName, fav, dueDate, assignName}) {
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
        return <NewTodoForm edit={edit} onSubmit={submitUpdate} />
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

function NewTodoList({email,projName,labelName,dueDate,fav,assignName}) {
    const [todos, setTodos] = React.useState([]);
    const [isActive, setIsActive] = React.useState(true); 
    const [allProj, setAllProj] = React.useState([{}]);
    const [editProj, setEditProj] = React.useState([{}]);
    // const [email, setEmail] = React.useState('')
    const emailFromStorage = JSON.parse(localStorage.getItem('email'));
    
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
          }
    

        const newTodo = [todo, ...todos];
        setTodos(newTodo);
        console.log(todo, ...todos);
        let data = {proj_name: projName, task_item:todo.text, email:emailFromStorage, order_id: todo.id, isComplete: 't', assignee:assignName, label_name:labelName, favourite:fav, due_date:dueDate}
        fetch('/projdet',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data));
        // let order_id = order_id + 1
        // setIsActive(true)  
    
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return todo;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item )));
        console.log('*****update todo is running******')
        let data ={email:emailFromStorage, proj_name:projName, task_item: newValue.text, assignee:assignName, order_id: todoId, isComplete: 't'}
        fetch('/enewproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data))
        // .then(data => setEditProj(data));
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !==id);
        console.log('*****remove todo is running******')
        let data ={email:emailFromStorage, proj_name:projName, assignee:assignName, order_id: id, isComplete: 't'}
        fetch('/rnewproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data))
        setTodos(removedArr);
  
    }
     
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
            console.log('*****complete todo is running******')
            let data ={email:emailFromStorage, proj_name:projName, assignee:assignName, order_id: id, isComplete: todo.isComplete}
            fetch('/cnewproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
                'Content-Type': 'application/json'}} )
            .then(response => response.json())
            .then(data => console.log(data))
            setIsActive(false) 
          }
          return todo;
        });
        
        setTodos(updatedTodos);
      
      };


    return(
        <div className='new-todo'>
            <h1>what's the Plan for Today?</h1>
            <NewTodoForm onSubmit={addTodo}  email={email} isActive={isActive}email={email} projName={projName} labelName={labelName} fav={fav} dueDate={dueDate} assignName={assignName}/>
            <NewTodo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} isActive={isActive} projName={projName} labelName={labelName} dueDate={dueDate} fav={fav} assignName={assignName} />
        </div>
        
    );
};