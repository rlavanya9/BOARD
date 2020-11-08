const MenuItems = [
    {
        title: 'Home',
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Features',
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Contact Us',
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Sign Up',
        url: '#',
        cName: 'nav-links-mobile'
    },
  
  ]
  
  const STYLES = [
    'btn--primary',
    'btn--outline'
  ]
  
  const SIZES = [
    'btn--medium',
    'btn--large'
  ]
  
  const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
  }) => {
  
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
  
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
  
    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
  }

  function Navbar() {

    const [clicked, setClicked] = React.useState(false);
  
    const handleClick = () => {
        setClicked(!clicked)
    };
  
    return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">TODO<i className="fab fa-react"></i></h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                            {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
            <Button>Sign Up</Button>
        </nav>
    )
  };
const Link =  window.ReactRouterDOM.Link;
const styled = window.styled;


const container = styled.div`
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

const FormWrap = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;

@media screen and (max-width: 400px) {
    height: 80%
}
`;


const Icon = styled.div`
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

const FormContent = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;

@media screen and (max-width: 480px){
    padding: 10px
}
`;

const Form = styled.form`
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

const FormH1 = styled.h1`
margin-bottom: 40px;
color: #fff;
font-size: 20px;
font-weight: 400;
text-align: center;
`;

const FormLabel = styled.label`
margin-bottom: 8px;
font-size: 14px;
color: #fff;
`;

const FormInput = styled.input`
padding: 16px 16px;
margin-bottom: 32px;
border: none;
border-radius: 4px;
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

const Text = styled.span`
text-align: center;
margin-top: 24px;
color: #fff;
font-size: 14px; 
`;


const SignIn = () => {
    return (
        <React.Fragment>
            <FormWrap>
                <FormContent>
                    <Form action="#">
                        <FormH1> sign in to your account </FormH1>
                        <FormLabel htmlFor='for'>Email</FormLabel>
                        <FormInput type='email' required />
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput type='password' required />
                        <FormButton type='submit'> Continue </FormButton>
                        <Text>Forgot password</Text>
                    </Form>
                </FormContent>
            </FormWrap>
        </React.Fragment>
    )
} 

  
  function App() {
    return (
      <div className="App">
        <Navbar />
        <SignIn />
      </div>
    );
  }
  
  // export default App;
  
  ReactDOM.render(<App />, document.getElementById('root'));
  