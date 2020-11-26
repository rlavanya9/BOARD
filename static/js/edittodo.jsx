const styled = window.styled;
const css = window.css;
const gradient = degs => styled.css`
background: linear-gradient(${degs || 130}deg,
    #00dbde 0%,
    #fc00ff 100%,
    )
`;

const Card = styled.div`
position: relative;
overflow: hidden;
width: 300px;
padding: 3rem 0 2rem;
border-radius: 0.5rem;
color: white;
${(gradient())};
box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.025),
0 9px 46px 8px rgba(0, 0, 0, 0.025),
0 11px 15px -7px rgba(0, 0, 0, 0.25);

&::after {
    content: "";
    position: relative;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    ${gradient(-50)};
    transition: opacity 0.75;

    &:hover::after {opacity: 1;}
}
`;

const Content = styled.div`
position: relative;
z-index: 3;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;



const Icon = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 80px;
height: 80px;
flex: 0 0 auto;
margin-bottom: 2rem;
border-radius: 50%;
font-size: 40px;
color: white;
${gradient()};
box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.25);
`;

const ProjectTitle = styled.div`
font-size: 1.25rem;
`;
const FeatureListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.325rem;

    &  > i {
        font-size: 20px;
        margin-right: 0.5rem;
    }
`;

const BackgroundSquare = styled.div`
position: absolute;
z-index: 2;
top: 52%;
left: 0%;
width: 200%;
height: 100%;
background: rgba(255, 255, 255, 0.1);
transform: rotate(-3deg);
`;

const FormButton = styled.button`
background: #01bf71;
padding: 16px 0;
border: None;
border-radius: 4px;
color: #fff;
font-size: 20px;
cursor: pointer;
`;


const Task = ({ showTask, setShowTask, email, projName}) => {
    const TaskRef = useRef();

    
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
          <Backgrounda onClick={closeTask} ref={TaskRef}>
              <AllTodoList showTask={showTask} email={email} projName={projName} />
          </Backgrounda>
        ) : null}
      </React.Fragment>
    );
  };
  


function AllProjContainer() {
    const [allProj, setAllProj] = React.useState([{}]);
    const [email, setEmail] = React.useState('')
    const emailFromStorage = JSON.parse(localStorage.getItem('email'));
    const [showTask, setShowTask] = React.useState(false);
    const [projName, setProjName] = React.useState('')

    const openTask = (project) => {
        setShowTask(prev => !prev);
        setProjName(project);

        };
        
    // const handleSubmit = (evt) => {
    //     // evt.preventDefault()
    //     setProjName(evt.target.val);
        
    // }
    React.useEffect(() => {
        console.log('*****useEffect is running******')
        let data ={email:emailFromStorage}
        fetch('/cardproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => setAllProj(data));
        // debugger
    },[])

    

    const allprojcards = [];
    for (const element of allProj){
        console.log('*******this is the list loop *******')
        console.log(element)
        for (const project in element){
            console.log('********this is the dict loop*****')
            console.log(project)
            console.log('******items loop ********')
            // const list = Object.values(project)
            const list = element[project]
            console.log(list)
            // debugger
            allprojcards.push(
            // return (
            //     <div>
                    <Card>
                        <BackgroundSquare />
                        <Content>
                            <Icon className="fas fa-tasks"/>
                            <ProjectTitle>{project}</ProjectTitle>
                            {
                            list.map(item => (
                                <FeatureListItem>
                                    <i class="fas fa-check"></i>
                                    <span>{item}</span>
                                </FeatureListItem>
                            ))
                            }
                            {/* <FormButton type="submit" onClick={openTask}>Edit items </FormButton> */}
                            <FormButton type="submit" onClick={()=> openTask(project)}>Edit items </FormButton>
                            {/* <FormButton type="submit" value={project} openTask={openTask} onClick={handleSubmit}>Edit items </FormButton> */}
                        </Content>
                    </Card>
                    
            //     </div>
            );
                
        }
    }

    return <React.Fragment><div>{allprojcards}</div>
    {/* <FormButton type="submit" value='alltask' onClick={openTask}>Edit items </FormButton> */}
    <Task showTask={showTask} setShowTask={setShowTask} email={email} projName={projName}/> 
    </React.Fragment>
}




function AllProj() {

    return (
        <React.Fragment>
      <div style={{
          display: "flex",
          justifycontent:"center",
          alignItems:"center",
          height:"100vh"
      }}>
        <AllProjContainer />
      </div>
      </React.Fragment>
    );
}



function AllTodoForm(props) {
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
        // let data = {proj_name: 'trader joes', task_item:input, email:props.email, order_id: '1', isComplete: props.isComplete, assignee: props.email}
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
            <input type='text' placeholder={props.proj_name} value={input}
            name='text' className='todo-input'
            onChange={handleChange} ref={inputRef}/>
            <button className='todo-button'>Click me</button></React.Fragment>)}
        </form>
    )
}

function AllTodo({todos, completeTodo, removeTodo, updateTodo, email, isActive}) {
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
        return <AllTodoForm edit={edit} onSubmit={submitUpdate} />
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

function AllTodoList({email,projName}) {
    const [todos, setTodos] = React.useState([]);
    const [isActive, setIsActive] = React.useState(true); 
    const [allProj, setAllProj] = React.useState([{}]);
    const [editProj, setEditProj] = React.useState([{}]);
    // const [email, setEmail] = React.useState('')
    const emailFromStorage = JSON.parse(localStorage.getItem('email'));
    
    const addTodo = todo => {
        // if (!todo.text || /^\s*$/.test(todo.text)) {
        //     return;
        //   }
    
        //   React.useEffect(() => {
        console.log('*****addtodo is running******')
        let data ={email:emailFromStorage,proj_name:projName}
        console.log(projName)
        fetch('/allproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        // fetch('/allproj.json')
        .then(response => response.json())
        .then(data => setAllProj(data));
            // debugger
        // },[])
    
        
    
        const newTodo = [];
        for (const element of allProj){
            console.log('*******this is the todo list loop *******')
            console.log(element)
            for (const project in element){
                console.log('********this is the todo dict loop*****')
                console.log(project)
                console.log('******items todo loop ********')
                // const list = Object.values(project)
                for (const plist of element[project]){
                // const todos = element[project]
                // for (const titem of todos){
                // //     console.log('***********todo row***********')
                // //     console.log(titem)
                // //     setTodos(titem)
                // // }
                    console.log('***********todo row before***********')
                    console.log(plist)
                //     const titemD = {
                //         id: Math.floor(Math.random() * 10000),
                //         text: titem,
                //     };
                    newTodo.push(plist)
                // const newTodo = [todo, ...todos];
                    // setTodos(newTodo);
                    // console.log('***********todo row***********')
                    // console.log(newTodo)
                }
            }
        }
            
       
        // const newTodo = [todo, ...todos];

        setTodos(newTodo);
        console.log('***********todo row***********')
        console.log(newTodo)
        // console.log('******todo..todos')
        // console.log(todo, ...todos);
       
                
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return todo;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item )));
        console.log('*****update todo is running******')
        let data ={email:emailFromStorage, proj_name:projName, task_item: newValue.text, assignee:emailFromStorage, order_id: todoId, isComplete: 't'}
        fetch('/eproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data))
        // .then(data => setEditProj(data));
        window.location.reload();
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !==id);
        console.log('*****remove todo is running******')
        let data ={email:emailFromStorage, proj_name:projName, assignee:emailFromStorage, order_id: id, isComplete: 't'}
        fetch('/rproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => console.log(data))
        setTodos(removedArr);
        window.location.reload();
  
    }
     
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
            console.log('*****complete todo is running******')
            let data ={email:emailFromStorage, proj_name:projName, assignee:emailFromStorage, order_id: id, isComplete: todo.isComplete}
            fetch('/cproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
                'Content-Type': 'application/json'}} )
            .then(response => response.json())
            .then(data => console.log(data))
            setIsActive(false) 
          }
          return todo;
        });
        
        setTodos(updatedTodos);
        window.location.reload();
      
      };


    return(
        <div>
            <h1>Modify items</h1>
            <AllTodoForm onSubmit={addTodo}  email={email} isActive={isActive} proj_name={projName}/>
            <AllTodo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} isActive={isActive} proj_name={projName}/>
        </div>
        
    );
};