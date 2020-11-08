const styled = window.styled

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin:0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
`;


const container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;
const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

 
function Addproj() {

    const [showModal, setShowModal] = useState(false);
  
    const openModal = () => {
      setShowModal(prev => !prev);
    };

    

    return(
        <React.Fragment>
            <container>
            <Button onClick={openModal}>I'm a modal</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
            <GlobalStyle />
            </container>
        </React.Fragment>
    );
}

function ModWindow() {
    const Modal = ({ showModal, setShowModal }) => {
        const modalRef = useRef();
      
        const animation = useSpring({
          config: {
            duration: 250
          },
          opacity: showModal ? 1 : 0,
          transform: showModal ? `translateY(0%)` : `translateY(-100%)`
        });
      
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
          <>
            {showModal ? (
              <Background onClick={closeModal} ref={modalRef}>
                <animated.div style={animation}>
                  <ModalWrapper showModal={showModal}>
                    <ModalImg src={require('./modal.jpg')} alt='camera' />
                    <ModalContent>
                    <FormContent>
                    <Form action="#">
                        <FormH1> sign in to your account </FormH1>
                        <FormLabel htmlFor='for'>Project Name</FormLabel>
                        <FormInput type='text' required />
                        <FormLabel htmlFor='for'>Label</FormLabel>
                        <FormInput type='password' required />
                        <FormButton type='submit'> Add </FormButton>
                        <Text>Forgot password</Text>
                    </Form>
                </FormContent>
                    </ModalContent>
                    <CloseModalButton
                      aria-label='Close modal'
                      onClick={() => setShowModal(prev => !prev)}
                    />
                  </ModalWrapper>
                </animated.div>
              </Background>
            ) : null}
          </>
        );
      };
      
}

