function HomeProjContainer() {
    const [homeProj, setHomeProj] = React.useState([{}]);
    const [email, setEmail] = React.useState('')
    const emailFromStorage = JSON.parse(localStorage.getItem('email'));
       
 
    React.useEffect(() => {
        console.log('*****useEffect is running******')
        let data ={email:emailFromStorage}
        fetch('/homeproj.json',{method: "POST",  body: JSON.stringify(data),  headers: {
            'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => setHomeProj(data));
    },[])

    

    const homeprojcards = [];
    for (const element of homeProj){
        console.log('*******this is the list loop *******')
        console.log(element)
        for (const project in element){
            console.log('********this is the dict loop*****')
            console.log(project)
            console.log('******items loop ********')
            const list = element[project]
            console.log(list)
            homeprojcards.push(
                    <Card>
                        <BackgroundSquare />
                        <Content>
                            <CIcon className="fas fa-tasks" >
                            <ProjectTitle>{project}</ProjectTitle>
                            </CIcon>
                            {
                            list.map(item => (
                                <FeatureListItem>
                                    <i className="fas fa-check"></i>
                                    <span>{item}</span>
                                </FeatureListItem>
                            ))
                            }
                        </Content>
                    </Card>
            );
                
        }
    }

    return (<React.Fragment>{homeprojcards}</React.Fragment>);
}




function HomeProj() {

    return (
      <div style={{
          marginTop: "2%",
          marginLeft: "10%",
          display: "flex",
          justifycontent:"flex-start",
          alignItems:"flex-start",
          height:"40vh",
          flexWrap:"wrap"
      }}>
        <HomeProjContainer />
      </div>
    
    );
}