function AboutUs(){
    return (
        <div className='hero-container'>
            <video src='static/video/sample.mov' autoPlay loop muted />
            <h1>From overwhelmed to on top of it</h1>
            <p> Todo list gives you the confidence that everything’s organized and accounted for, 
                so you can make progress on the things that are important to you.
                Start each day feeling calm and in control
                Focus your energy on the right things
            </p>
            <div className='hero-btns'>
            <Link to='/'><Button
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn--large'
                > GET STARTED </Button></Link>
            </div>
        </div>
    );
}