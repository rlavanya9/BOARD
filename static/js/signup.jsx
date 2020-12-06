const Link =  window.ReactRouterDOM.Link;
const styled = window.styled;

function validate(values) {
    let errors = {};
  
    // if (!values.username.trim()) {
    //   errors.username = 'Username required';
    // }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
return errors; 
} 

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
    //   username: '',
      email: '',
      password: '',
      password2: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [email, setValues] = React.useState('')
    // const [password, setValues] = React.useState('')
    const history = useHistory();
  
    const handleChange = e => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
      console.log('********name and value*******')
      console.log(name)
      console.log(value)
      console.log('*****name and value*********')
    };
    // function handleEmailChange(evt){
    //     console.log('emailchange')
    //     setValues(evt.target.value)
    // }
    // function handlePswdChange(evt){
    //     console.log('pswdchange')
    //     setValues(evt.target.value)
    // }

    // function handlePswd2Change(evt){
    //     console.log('pswd2change')
    //     setValues(evt.target.value)
    // }
  
    const handleSubmit = e => {
      e.preventDefault();
    
      setErrors(validate(values));
      setIsSubmitting(true);
      let data = {email:values.email, password:values.password, confirmpswd:values.password2}
      fetch('/signup',{method: "POST",  body: JSON.stringify(data),  headers: {
        'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => {
            console.log(data);
            if (data == 'Account created! please log in') {
                props.setEmail(data);
                localStorage.setItem('email', JSON.stringify(data));
                // setIsSubmitting(true);
                history.push('/')
      }     else {
                alert(data)
           };
    });
      
  };
    
      
  
    useEffect(
      () => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
          callback();
        }
      },
      [errors]
    );
  
    return { handleChange, handleSubmit, values, errors };
  };

const FormSignup = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
      submitForm,
      validate
    );
  
    return (
      <div className='form-content-right'>
        <form onSubmit={handleSubmit} className='form' noValidate>
          <h1>
            Get started with us today! Create your account by filling out the
            information below.
          </h1>
          {/* <div className='form-inputs'>
            <label className='form-label'>Username</label>
            <input
              className='form-input'
              type='text'
              name='username'
              placeholder='Enter your username'
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div> */}
          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              placeholder='Enter your email'
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Confirm Password</label>
            <input
              className='form-input'
              type='password'
              name='password2'
              placeholder='Confirm your password'
              value={values.password2}
              onChange={handleChange}
            />
            {errors.password2 && <p>{errors.password2}</p>}
          </div>
          <button className='form-input-btn' type='submit'>
            Sign up
          </button>
          <span className='form-input-login'>
            Already have an account? Login <Link to='/'>here</Link>
          </span>
        </form>
      </div>
    );
  };

  const FormSuccess = () => {
    return (
      <div className='form-content-right'>
        <h1 className='form-success'>Account Created</h1>
        <Link to='/'><button className='form-input-btn'>Login now </button></Link>
        <img className='form-img-4' src='/static/img/img-4.svg' alt='success-image' />
        
      </div>
    );
  };

  

  const SignUp = () => {
    const [isSubmitted, setIsSubmitted] = React.useState(false);
  
    function submitForm() {
      setIsSubmitted(true);
    }
    return (
      <React.Fragment>
        <div className='form-container'>
          <span className='close-btn'>×</span>
          <div className='form-content-left'>
            <img className='form-img' src='/static/img/img-1.svg' alt='form image' />
          </div>
          {!isSubmitted ? (
            <FormSignup submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
      </React.Fragment>
    );
  };