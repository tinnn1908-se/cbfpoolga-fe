import { TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/footer.component'
import Header from '../components/header.component'
import '../css/login.scss'
const LoginView = () => {
    function onClickHandler(event: React.MouseEvent) {
        var id = event.currentTarget.getAttribute('id');

    }
    return (
        <div className='login'>
            <form className='login-form'>
                <h2>Login Form</h2>
                <div className='line'></div>
                <TextField className='txtEmail' id="standard-basic" label="Email" variant="standard" />
                <TextField
                    className='txtPassword'
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                />
                <button className='forgetPasswordBtn'>Forget Password ?</button>
                <button className='signinBtn'>Sign In</button>
                <p>Not a member ? <Link to='/signup'>Signup</Link></p>
            </form>

        </div>
    )
}

export default LoginView