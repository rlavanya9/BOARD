
  const Router = window.ReactRouterDOM.BrowserRouter;
  const Route =  window.ReactRouterDOM.Route;
  const Link =  window.ReactRouterDOM.Link;
  const Prompt =  window.ReactRouterDOM.Prompt;
  const Switch = window.ReactRouterDOM.Switch;
  const Redirect = window.ReactRouterDOM.Redirect;
  const useHistory = window.ReactRouterDOM.useHistory; 
  
  function App() {
    
    function getEmail() {
        const email = localStorage.getItem('email');
        if (email) {
            return JSON.parse(email)
        
        } else {
            return ''
        }

    }

    const [email, setEmail] = React.useState(getEmail);
    console.log(email)

    return (
      <div className="App">
          <Router>
            <Switch>
                <Route exact path='/' >
                    <Navbar />
                    <SignIn setEmail={setEmail}/>
                </Route>
                <Route path='/signup' >
                    <SignUp setEmail={setEmail}/>
                </Route>
                <Route path='/home' >
                    <Navside email={email}/>
                    <HomeProj email={email}/>
                </Route>
                <Route path='/about' >
                    <Navbar />
                    <AboutUs />
                </Route>
                <Route path='/contact' >
                    <Navbar />
                    <Contact />
                </Route>
                <Route path='/projects'>
                    <Navside email={email}/>
                    {/* <ViewProject email={email}/> */}
                    {/* <Addproj email={email}/> */}
                    {/* <TodoList /> */}
                    <NewProj email={email}/>
                </Route>
                <Route path='/allproj'>
                    <Navside email={email}/>
                    <AllProj email={email}/>
                </Route>
                <Route path='/today'>
                    <Navside email={email}/>
                    <Today email={email}/>
                </Route> 
                <Route path='/pastdue' >
                    <Navside email={email}/>
                    <PastDue email={email}/>
                </Route> 
                <Route path='/upcoming' >
                    <Navside email={email}/>
                    <Upcoming email={email}/>
                </Route> 
                <Route path='/favourites'>
                    <Navside email={email}/>
                    <Favourites email={email}/>
                </Route>
                <Route path='/label'> 
                    <Navside email={email}/>
                    <Label email={email}/>
                </Route>
            </Switch> 
          </Router>
      </div>
    );
  }
  
  
  
  ReactDOM.render(<App />, document.getElementById('root'));
  