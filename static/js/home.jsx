const SidebarData = [
    {
        title: 'Add Projects',
        path: '/projects',
        cName: 'nav-text'
    },
    
    {
        title: 'Edit Projects',
        path: '/allproj',
        cName: 'nav-text'
    },

    {
        title: 'Today',
        path: '/today',
        cName: 'nav-text'
    },

    {
        title: 'Past Due',
        path: '/pastdue',
        cName: 'nav-text'
    },
    {
        title: 'Upcoming',
        path: '/upcoming',
        cName: 'nav-text'
    },

    {
        title: 'Favourites',
        path: '/favourites',
        cName: 'nav-text'
    },
    {
        title: 'Label',
        path: '/label',
        cName: 'nav-text'
    },

]

const Menuside = [
    {
        title: 'Home',
        url: '/home',
        cName: 'nav-links-home'
    },
    {
        title: 'Contact Us',
        url: '/contact',
        cName: 'nav-links-contact'
    },
    {
        title: 'Logout',
        url: '/',
        cName: 'nav-links-logout'
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
            {/* <div className='navbar'> */}
            <div className='NavbarItems'> 
                <Link  to='#' className="menu-bars">
                <i className='fas fa-bars' onClick={showSidebar}></i>
                </Link>
                <ul className='navbar'>
                    {Menuside.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>{item.title}</Link>
                            </li>
                        )
                    })}
                </ul>
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
                                <Link to={item.path}>
                                {/* <a href={item.path}> */}
                                <span>{item.title}</span>    
                                {/* </a> */}
                                </Link>
                            </li>
                    );
                })}
                </ul>
            </nav>
        </React.Fragment>        
    )    
};


  // export default App;
  
  
  