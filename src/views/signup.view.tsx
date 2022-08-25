import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/signup.scss'
import { initialSignupRequest, SignupRequest } from '../models'
import UserService from '../services/user.service'
import emailjs from '@emailjs/browser';
import { APPCONSTANT } from '../app.constant'

const SignupView = () => {

    const [signupReq, setSignupReq] = useState<SignupRequest>(initialSignupRequest);

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        var name = event.currentTarget.getAttribute('name');
        switch (name) {
            case 'username':
                var username = event.currentTarget.value;
                setSignupReq({ ...signupReq, username });
                break;
            case 'email':
                var email = event.currentTarget.value;
                setSignupReq({ ...signupReq, email });
                break;
            case 'password':
                var password = event.currentTarget.value;
                setSignupReq({ ...signupReq, password });
                break;
            case 'confirmPassword':
                var confirmPassword = event.currentTarget.value;
                setSignupReq({ ...signupReq, confirmPassword });
                break;
            default:
                break;
        }
    }
    async function onSignupHandler(event: React.MouseEvent) {
        // get token
        event.preventDefault();
        var token = await UserService.register(signupReq);
        console.log("token : " + token)
        if (token && token.length > 0) {
            // send email
            var isSent = await emailjs.send("service_ngoctin0001", "template_wrxck5l", {
                username: signupReq.username,
                url: `${APPCONSTANT.verify_email_base_url}/verifyemail/${token}`,
                cust_email: signupReq.email,
            }, 'rAEQCkSTv3QadJkmF');
            if (isSent.status === 200) {
                // set modal to inform user that they have created user !
                // but they need to verify email    
                console.log("Email is sent !")
            }
        }
    }
    return (
        <div className='signup'>
            <form className='signup-form'>
                <h2>Sign Up Form</h2>
                <div className='line'></div>
                <TextField className='txtUsername' id="standard-basic" name='username' label="Username" variant="standard" onChange={onChangeHandler} />
                <TextField className='txtEmail' id="standard-basic" name='email' label="Email" variant="standard" onChange={onChangeHandler} />
                <TextField
                    className='txtPassword'
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    name='password'
                    onChange={onChangeHandler}
                    variant="standard"
                />
                <TextField
                    className='txtConfirmPassword'
                    id="standard-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    name='confirmPassword'
                    onChange={onChangeHandler}
                    variant="standard"
                />
                <button className='signupBtn' onClick={onSignupHandler}>Sign Up</button>
                <p>Already Sign up? <Link to='/login'>Sign In</Link></p>
            </form>

        </div>
    )
}

export default SignupView