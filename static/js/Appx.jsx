
  function App() {
    const Router = window.ReactRouterDOM.BrowserRouter;
    const Route =  window.ReactRouterDOM.Route;
    const Link =  window.ReactRouterDOM.Link;
    const Prompt =  window.ReactRouterDOM.Prompt;
    const Switch = window.ReactRouterDOM.Switch;
    const Redirect = window.ReactRouterDOM.Redirect;

    return (
      <div className="App">
          <React.Fragment>
          <Router>
            <Switch>
                <Route exact path='/' >
                    <Navbar />
                    <SignIn />
                </Route>
                <Route path='/home' >
                    <Navside />
                </Route>
                <Route path='/today'>
                    <Navside />
                    <Today />
                </Route> 
                <Route path='/upcoming' >
                    <Navside />
                    <Upcoming />
                </Route>
                <Route path='/projects'>
                    <Navside />
                    <ViewProject />
                    <Addproj />
                </Route>
                <Route path='/favourites'>
                    <Navside />
                    <Favourites />
                </Route>
                <Route path='/label'> 
                    <Navside />
                    <Label />
                </Route>
            </Switch> 
          </Router>
        </React.Fragment>
      </div>
    );
  }
  
  
  
  ReactDOM.render(<App />, document.getElementById('root'));
  