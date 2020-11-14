const styled = window.styled;
const css = window.css;
// color1 = #00dbde
// color2 = #fc00ff
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


function Projectcards() {
    const [ list ] = React.useState(["list 1", "list 2", "list 3", "list 4", "list 5"])
    return (
        <div>
            <Card>
                <BackgroundSquare />
                <Content>
                    <Icon className="fas fa-tasks"/>
                    <ProjectTitle> Project </ProjectTitle>
                    {
                    list.map(item => (
                        <FeatureListItem>
                            <i class="fas fa-check"></i>
                            <span>{item}</span>
                        </FeatureListItem>
                    ))
                    }
                </Content>
            </Card>
        </div>
    )
}


function ViewProject() {
    return (
        <React.Fragment>
      <div style={{
          display: "flex",
          justifycontent:"center",
          alignItems:"center",
          height:"100vh"
      }}>
        <Projectcards />
      </div>
      </React.Fragment>
    );
  }
  
  // export default App;
  
  