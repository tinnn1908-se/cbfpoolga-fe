import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/signup.scss'
import { IModal, initialSignupRequest, SignupRequest } from '../models'
import UserService from '../services/user.service'
import emailjs from '@emailjs/browser';
import { APPCONSTANT } from '../app.constant'
import Validation from '../services/validation.service'
import { Button, Modal } from 'react-bootstrap'
import { MutatingDots } from 'react-loader-spinner'

import '../css/loading.scss'
const SignupView = () => {

    const [signupReq, setSignupReq] = useState<SignupRequest>(initialSignupRequest);
    const [modal, setModal] = useState<IModal>({
        title: '',
        isOpen: false,
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(false);
    }, [isDataChanged])


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
        // event.preventDefault();
        var isValidUsername = Validation.isValidUsername(signupReq.username);
        var isValidEmail = Validation.isValidEmail(signupReq.email);
        var isValidPassword = Validation.isValidPassword(signupReq.password);
        var isValidConfirmPassword = signupReq.confirmPassword === signupReq.password;
        console.log('isValidUsername : ' + isValidUsername)
        console.log('isValidEmail : ' + isValidEmail)
        console.log('isValidPassword : ' + isValidPassword)
        setIsLoading(true);
        
        var isErrorExisted = 0;
        if (!isValidConfirmPassword) {
            setModal({
                isOpen: true,
                message: 'Confirm Password must be the same with Password !',
                title: 'Sign up failed !'
            })
            isErrorExisted++;
        }
        if (!isValidPassword) {
            setModal({
                isOpen: true,
                message: `Required Password lenght is from 8 to 15 and it must include at least special character, 
                one uppercase, one lower case , one number. 
                For example : Cbf1234@`,
                title: 'Sign up failed !'
            })
            isErrorExisted++;
        }
        if (!isValidEmail) {
            setModal({
                isOpen: true,
                message: 'Your email is not acceptable ! For example : cbfpool@gmail.com ',
                title: 'Sign up failed !'
            })
            isErrorExisted++;
        }
        if (!isValidUsername) {
            setModal({
                isOpen: true,
                message: "Username must contain character '.' ! For example : cbfpool.ga ",
                title: 'Sign up failed !'
            })
            isErrorExisted++;
        }

        if (isErrorExisted === 0) {
            var token = await UserService.register(signupReq);
            setIsDataChanged(!isDataChanged);
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
                    setModal({
                        isOpen: true,
                        message: 'Congratulation ! We already sent you an email to verify your account !',
                        title: 'Sign up Successfully !'
                    })
                    console.log("Email is sent !")
                }
            } else {
                setModal({
                    isOpen: true,
                    message: `Your username or email is not available .Please try again !`,
                    title: 'Sign up failed !'
                })
            }
        }else{
            setIsDataChanged(!isDataChanged);
        }
    }
    function onHideHandler() {
        setModal({ ...modal, isOpen: false });
    }
    function handleModalClose(event: React.MouseEvent) {
        var btnID = event.currentTarget.getAttribute('id');
        if (btnID === 'btnOK') {
            setModal({ ...modal, isOpen: false });
            navigate('/', {
                replace: false,
            })
        } else {
            setModal({ ...modal, isOpen: false });
        }

    }
    if (isLoading) {
        return (
            <div className='loading'>
                <MutatingDots
                    height="100"
                    width="100"
                    color="#4fa94d"
                    secondaryColor='#4fa94d'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{
                        'display': 'flex',
                        'flexDirection': 'column',
                        'justifyContent': 'center',
                        'alignItems': 'center',
                    }}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        )
    } else {
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

                {(modal.message.length === 0) && (
                    <Modal style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "alignItems": "center",
                        "justifyContent": "center"
                    }} show={modal.isOpen}
                        onHide={onHideHandler}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Processing</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Creating ...
                        </Modal.Body>
                    </Modal>
                )}

                {(modal.message.length !== 0) && (
                    <Modal style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "alignItems": "center",
                        "justifyContent": "center"
                    }} show={modal.isOpen}
                        onHide={onHideHandler}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{modal.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {modal.message.split('!').map(single => (
                                <p>{single}</p>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            {modal.title === 'Sign up Successfully !' && <Button variant="success" id='btnOK' onClick={handleModalClose}>
                                Ok
                            </Button>}
                            {modal.title === 'Sign up failed !' && <Button variant="danger" id='btnClose' onClick={handleModalClose}>
                                Close
                            </Button>}
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        )
    }
}

export default SignupView