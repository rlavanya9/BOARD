const SidebarData = [
    {
        title: 'Today',
        path: '/home',
        cName: 'nav-text'
    },
    {
        title: 'Upcoming',
        path: '/home',
        cName: 'nav-text'
    },
    {
        title: 'Projects',
        path: '/home',
        cName: 'nav-text'
    },
    {
        title: 'Favourites',
        path: '/home',
        cName: 'nav-text'
    },
    {
        title: 'Label',
        path: '/home',
        cName: 'nav-text'
    },

]

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


function Navside(){

       
    const Router = window.ReactRouterDOM.BrowserRouter;
    const Route =  window.ReactRouterDOM.Route;
    const Link =  window.ReactRouterDOM.Link;
    const Prompt =  window.ReactRouterDOM.Prompt;
    const Switch = window.ReactRouterDOM.Switch;
    const Redirect = window.ReactRouterDOM.Redirect;


    const [sidebar, setSidebar] = React.useState(false);

    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    return(
        <React.Fragment>
            <div className='navbar'>
            <h1 className="navbar-logo">TODO<i className="fab fa-react"></i></h1>
            <ul className='nav-menu active'>
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
                <Link  to='#' className="menu-bars">
                <i className='fas fa-bars' onClick={showSidebar}></i>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu-home active' : 'nav-menu-home'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                       <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <i className='fas fa-times'></i>
                                </Link>     
                        </li>
                        {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <a href={item.path}>
                                <span>{item.title}</span>    
                                </a>
                            </li>
                    );
                })}
                </ul>
            </nav>
        </React.Fragment>        
    )    
};

function Home() {

    const Router = window.ReactRouterDOM.BrowserRouter;
    const Route =  window.ReactRouterDOM.Route;
    const Link =  window.ReactRouterDOM.Link;
    const Prompt =  window.ReactRouterDOM.Prompt;
    const Switch = window.ReactRouterDOM.Switch;
    const Redirect = window.ReactRouterDOM.Redirect;

    return (
      <React.Fragment>
          <Router>
            <Navside />
            <Switch>
                <Route path='/' />
            </Switch>
          </Router>
        </React.Fragment>
    );
  }
  
  // export default App;
  
  ReactDOM.render(<Home />, document.getElementById('home'));
  