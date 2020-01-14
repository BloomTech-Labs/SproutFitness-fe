import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, Input } from 'reactstrap'


const ResetPassword = (props) => {
 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [updated, setUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

 // Checking link token if expired
 // eslint-disable-next-line react-hooks/exhaustive-deps
 const checkToken = async () => {
    console.log('PROPS:', props)
    const { match: { params: { token } } } = props
    try {
      const response = await axios.get(
        'http://localhost:5000/api/reset-password/coaches', // local
        //'https://sprout-fitness-be-staging.herokuapp.com/api/reset-password/coaches', // staging
        {params: { resetPasswordToken: token}}
        )
       console.log('RESPONSE:', response);
      if (response.data.message === 'password reset link a-ok') {
        setUsername(response.data.username)
        setUpdated(false)
        setIsLoading(false)
        setError(false)
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log(error.response.data);
      setUpdated(false)
      setIsLoading(false)
      setError(true)
    }
  }

  
  useEffect( () => {
    checkToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const handleChange = (event) => {
    setPassword(event.target.value)
  }


  // Updating password
  const updatePassword = async (e) => {
    e.preventDefault()
    const { match: { params: { token } } } = props
    try {
      const response = await axios.put(
        'http://localhost:5000/api/update-password-via-email/coaches', // local
        //'https://sprout-fitness-be-staging.herokuapp.com/api/update-password-via-email/coaches' // staging
        {
          username,
          password,
          resetPasswordToken: token,
        },
      )
      console.log('RESPONSE DATA:', response.data)
      if (response.data.message === 'password updated') {
        setUpdated(true)
        setError(false)
      } else {
        setUpdated(false)
        setError(true)
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }



    if (error) {
      return (
        <div className="password-reset-form">
            <h2>The link has expired or incorrect. Please send another reset link.</h2>
          <Button className="reset-password-btn  btn-incorrect-link" color="info">
            <Link to='/forgot-password'><span>Forgot Password?</span></Link>
           </Button>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div>
          <h1>Password Reset Screen</h1>
          <p>Loading User Data...</p>
        </div>
      );
    }


    return (
      <div>
        <Form className="password-reset-form"  onSubmit={updatePassword}>
        <h2>Pleaser enter new password</h2>
          <Input
            id="password"
            label="password"
            onChange={handleChange}
            value={password}
            type="password"
          />
          <Button className='reset-password-btn' color="info" type='submit'><span>Update Password</span></Button>
        </Form>

        {updated && (
          <div>
            <p>Your password has been successfully reset, please try logging in again.</p>
            <Button color="info" className="login-button">
              <Link to='/login'>Login</Link>
            </Button>
          </div>
        )}
        {/* <button className="auth-btn"></button>
        <Button color="info"><Link to='/'>Go Home</Link></Button> */}
      </div>
    )
}



export default ResetPassword


// VERSION WITH CLASSES

// import React, { Component } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

// const loading = {
//   margin: '1em',
//   fontSize: '24px',
// };


// export default class ResetPassword extends Component {
//   constructor() {
//     super();

//     this.state = {
//       username: '',
//       password: '',
//       updated: false,
//       isLoading: true,
//       error: false,
//     };
//   }


//   async componentDidMount() {
//     console.log('PROPS:', this.props)
//     const { match: { params: { token } } } = this.props
//     try {
//       const response = await axios.get(
//         'http://localhost:5000/api/reset-password/coaches', // local
//         //'https://sprout-fitness-be-staging.herokuapp.com/api/reset-password/coaches', // staging
//         {
//         params: {
//           resetPasswordToken: token,
//         },
//       })
//        console.log('RESPONSE:', response);
//       if (response.data.message === 'password reset link a-ok') {
//         this.setState({
//           username: response.data.username,
//           updated: false,
//           isLoading: false,
//           error: false,
//         });
//       } else {
//         console.log('error')
//       }
//     } catch (error) {
//       console.log(error.response.data);
//       this.setState({
//         updated: false,
//         isLoading: false,
//         error: true,
//       });
//     }
//   }


//   handleChange = name => (event) => {
//     this.setState({
//       [name]: event.target.value,
//     });
//   };


//   updatePassword = async (e) => {
//     e.preventDefault();
//     const { username, password } = this.state;
//     const { match: { params: { token } } } = this.props;
//     try {
//       const response = await axios.put(
//         'http://localhost:5000/api/update-password-via-email/coaches', // local
//         //'https://sprout-fitness-be-staging.herokuapp.com/api/update-password-via-email/coaches' // staging
//         {
//           username,
//           password,
//           resetPasswordToken: token,
//         },
//       );
//       console.log('RESPONSE DATA:', response.data);
//       if (response.data.message === 'password updated') {
//         this.setState({
//           updated: true,
//           error: false,
//         });
//       } else {
//         this.setState({
//           updated: false,
//           error: true,
//         });
//       }
//     } catch (error) {
//       console.log('error:', error.response.data)
//         this.setState({
//           updated: false,
//           error: true,
//         })
//     }
//   }



//   render() {
//    const { password, error, isLoading, updated } = this.state;
//    console.log('Error:', error)

//     if (error) {
//       return (
//         <div>
//          <h1>Password Reset Screen</h1>
//           <div style={loading}>
//             <h4>Problem resetting password. Please send another reset link.</h4>
//            <button className="auth-btn"><Link to='/'>Go Home</Link></button>
//             <button>
//               <Link to='/forgot-password'>Forgot Password?</Link>
//             </button>
//           </div>
//         </div>
//       )
//     }

//     if (isLoading) {
//       return (
//         <div>
//           <h1>Password Reset Screen</h1>
//           <div style={loading}>Loading User Data...</div>
//         </div>
//       );
//     }


//     return (
//       <div>
//         <h1>Password Reset Screen</h1>
//         <form className="password-form" onSubmit={this.updatePassword}>
//           <input
//             id="password"
//             label="password"
//             onChange={this.handleChange('password')}
//             value={password}
//             type="password"
//           />
//           <button type='submit'>Update Password</button>
//         </form>

//         {updated && (
//           <div>
//             <p>Your password has been successfully reset, please try logging in again.</p>
//             <button className="login-button">
//               <Link to='/login'>Login</Link>
//             </button>
//           </div>
//         )}
//         <button className="auth-btn"><Link to='/'>Go Home</Link></button>
//       </div>
//     )
//   }
// }

