function AboutUs(){
    return (
        <div className='hero-container'>
            <video src='static/video/brainstorm.mp4' autoPlay loop muted />
            <h1>From overwhelmed to on top of it</h1>
            <p> Todo app gives you the confidence that everything’s organized and accounted for, 
                so you can make progress on the things that are important to you.
            </p>
            <p>Start each day feeling calm and in control.</p>
            <p>Focus your energy on the right things.
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