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
  
  
  function App() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
  
  // export default App;
  
  ReactDOM.render(<App />, document.getElementById('root'));
  