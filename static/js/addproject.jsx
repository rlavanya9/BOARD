const styled = window.styled
// const createGlobalStyle = window.styled 
const Link =  window.ReactRouterDOM.Link;

const useEffect = React.useEffect
const useCallback = React.useCallback
const useRef = React.useRef
const useState = React.useState

// const useSpring = React.useSpring
// const animated = React.animated

const Containera = styled.div`
min-height: 692px;
position: fixed;
bottom: 0;
left: 0;
right: 0;
top: 0;
z-index: 0;
overflow: hidden;
background: linear-gradient(108deg, rgba(1, 147, 86, 1) 0%, rgba(10, 201, 122, 1) 100%);
`;

const FormWrapa = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;

@media screen and (max-width: 400px) {
    height: 80%
}
`;


const Icona = styled.div`
margin-left: 32px;
margin-right: 32px;
text-decoration: none;
color: #fff;
font-weight: 700;
font-size: 32px;

@media screen and (max-width: 400px) {
    margin-left: 16px;
    margin-top: 8px;
}
`;

const FormContenta = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;

@media screen and (max-width: 480px){
    padding: 10px
}
`;

const Forma = styled.form`
background: #010101;
max-width: 400px;
height: auto;
width: 100%;
z-index: 1;
display: grid;
margin: 0 auto;
padding: 80px 32px;
border-radius: 4px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

@media screen and (max-width: 400px) {
    padding: 32px 32px;
}
`;

const FormH1a = styled.h1`
margin-bottom: 40px;
color: #fff;
font-size: 20px;
font-weight: 400;
text-align: center;
`;

const FormLabela = styled.label`
margin-bottom: 8px;
font-size: 14px;
color: #fff;
`;

const FormInputa = styled.input`
padding: 16px 16px;
margin-bottom: 32px;
border: none;
border-radius: 4px;
`;

const FormButtona = styled.button`
background: #01bf71;
padding: 16px 0;
border: None;
border-radius: 4px;
color: #fff;
font-size: 20px;
cursor: pointer;
`;

// const Text = styled.span`
// text-align: center;
// margin-top: 24px;
// color: #fff;
// font-size: 14px; 
// `;

// const GlobalStyle = createGlobalStyle`
//   * {
//     box-sizing: border-box;
//     margin:0;
//     padding: 0;
//     font-family: 'Arial', sans-serif;
//   }
// `;


// const Containera = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// height: 100vh;
// `;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 20
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

const Backgroundt = styled.div`
box-sizing: border-box;
margin: 0;
padding: 0;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
'Lucida Sans', Arial, sans-serif;
`;
const ModalWrappert = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;
const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

// const ModalContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   line-height: 1.8;
//   color: #141414;
//   p {
//     margin-bottom: 1rem;
//   }
//   button {
//     padding: 10px 24px;
//     background: #141414;
//     color: #fff;
//     border: none;
//   }
// `;

// const CloseModalButton = styled(fa-times)`
//   cursor: pointer;
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   width: 32px;
//   height: 32px;
//   padding: 0;
//   z-index: 10;
// `;

const Modalt = ({ showModalt, setShowModalt, email, projectName }) => {
  const modaltRef = useRef();

  // const animation = useSpring({
  //   config: {
  //     duration: 250
  //   },
  //   opacity: showModal ? 1 : 0,
  //   transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  // });

  const closeModalt = e => {
    if (modaltRef.current === e.target) {
      setShowModalt(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModalt) {
        setShowModalt(false);
        console.log('I pressed');
      }
    },
    [setShowModalt, showModalt]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <React.Fragment>
      {showModalt ? (
        <Backgrounda onClick={closeModalt} ref={modaltRef}>
            <TodoList showModalt={showModalt} email={email} proj_name={projectName}/>
        </Backgrounda>
      ) : null}
    </React.Fragment>
  );
};


const Modal = ({email, showModal, setShowModal }) => {
    const modalRef = useRef();
  
    // const animation = useSpring({
    //   config: {
    //     duration: 250
    //   },
    //   opacity: showModal ? 1 : 0,
    //   transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    // });
    const [showModalt, setShowModalt] = useState(false);
    const [projectName, setProjectName] = React.useState('')
    const [labelName, setLabelName] = React.useState('')
    const [Fav, setFav] = React.useState(false)

    function handleSubmit(evt){
      evt.preventDefault()
      console.log(projectName, labelName)
      const due_date = '2020-11-16'
      let data = {proj_name:projectName, label_name:labelName, due_date:due_date, email:email, favourite: Fav}
      fetch('/projdet',{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => console.log(data));
    }

    function handleProjectNameChange(evt){
      setProjectName(evt.target.value)
    }

    function handleLabelChange(evt){
      setLabelName(evt.target.value)
    }

    function handleFavChange(evt){
      setFav(!Fav)
      
    }

  
    const openModalt = () => {
      setShowModalt(prev => !prev);
    };

    const closeModal = e => {
      if (modalRef.current === e.target) {
        setShowModal(false);
      }
    };
  
    const keyPress = useCallback(
      e => {
        if (e.key === 'Escape' && showModal) {
          setShowModal(false);
          console.log('I pressed');
        }
      },
      [setShowModal, showModal]
    );
  
    useEffect(
      () => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
      },
      [keyPress]
    );
  
    return (
      <React.Fragment>
        {showModal ? (
          <Backgrounda onClick={closeModal} ref={modalRef}>
            {/* <animated.div style={animation}> */}
              <ModalWrapper showModal={showModal}>
                {/* <ModalImg src={require('./modal.jpg')} alt='camera' /> */}
                {/* <ModalContent> */}
                {/* <FormWrap showModal={showModal}> */}
                <FormContenta>
                <Forma >
                    <FormH1a> Add a new Project </FormH1a>
                    <FormLabela htmlFor='for'>Project Name</FormLabela>
                    <FormInputa type='text' value={projectName} onChange={handleProjectNameChange} required />
                    <FormLabela htmlFor='for'>Label</FormLabela>
                    <FormInputa type='text'  value={labelName} onChange={handleLabelChange} />
                    <FormInputa type='checkbox' checked={Fav} onChange={handleFavChange} />
                    <FormLabela htmlFor='fav'>'Add to Favourites</FormLabela>
                    <input type='date'></input>
                </Forma>
                </FormContenta>
            {/* </FormWrap> */}
                {/* </ModalContent> */}
                {/* <CloseModalButton
                  aria-label='Close modal'
                  onClick={() => setShowModal(prev => !prev)} */}
                {/* /> */}
                {/* <Calendar /> */}
                <FormButtona type='submit' value='next' onClick={openModalt}> Next </FormButtona> 
                {/* <FormButtona type='submit' value='next' onClick={handleSubmit}> Next </FormButtona> */}
                <FormButtona type='submit' value='cancel'> Cancel </FormButtona>
              </ModalWrapper>
            {/* </animated.div> */}
          </Backgrounda>
        ) : null}
        <Modalt showModalt={showModalt} setShowModalt={setShowModalt} email={email} proj_name={projectName} /> 
      </React.Fragment>
    );
  };
      
//  }

function Addproj({email}) {

  const [showModal, setShowModal] = useState(false);
  

  const openModal = () => {
    setShowModal(prev => !prev);
  };
  

  
  

  return(
      <React.Fragment>
          <Containera>
          <Button onClick={openModal}>New Project</Button>
          <Modal showModal={showModal} setShowModal={setShowModal} email={email}/>
          {/* <GlobalStyle /> */}
          </Containera>
      </React.Fragment>
  );
}

// function Mod() {
//   return (
//     <div className="Mod">
//       <Addproj />
//     </div>
//   );
// }

