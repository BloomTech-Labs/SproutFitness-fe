import React, { Fragment, useState, useEffect } from 'react';

const RegisterCoach = (props) => {
    const [registration, setRegistration] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const onChange = e => {
        setRegistration({[e.target.name]: e.target.value})
    
    }

    const submit = e => {
        props.history.push('/coachLogin')
    }

console.log(props)
    return  (
       <div>
            
            <form onSubmit={submit}>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputEmail4">First Name</label>
                    <input type="name" class="form-control" id="inputEmail4" placeholder="First Name" value={registration.first_name} name="first_name" onChange={onChange} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Last Name</label>
                    <input type="name" class="form-control" id="inputEmail4" placeholder="Last Name" value={registration.last_name} name="last_name" onChange={onChange} />
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Username</label>
                    <input type="name" class="form-control" id="inputEmail4" placeholder="Username" value={registration.username} name="username" onChange={onChange} />
                </div>
                <div class="form-group">
                    <label for="inputAddress2">Password</label>
                    <input type="name" class="form-control" id="inputEmail4" placeholder="Password" value={registration.password} name="password" onChange={onChange} />
                </div>
                
                <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
</div>
   
    )
}

export default RegisterCoach;