import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../css/login.scss'
import { IModal, User } from '../models'
import { saveUserInfor } from '../redux/slices/auth.slice'
import { AppDispatch } from '../redux/store'
import UserService from '../services/user.service'
import { MutatingDots } from 'react-loader-spinner'
import '../css/loading.scss'
const LoginView = () => {
    const [signinInfor, setSigninInfor] = useState<{
        inputString: string,
        password: string
    }>({
        inputString: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [modal, setModal] = useState<IModal>({
        title: '',
        isOpen: false,
        message: ''
    })
    useEffect(() => {
        setIsLoading(false);
    }, [isDataChanged])

    async function onClickHandler(event: React.MouseEvent) {
        event.preventDefault();
        var user: null | undefined | User = await UserService.signin(signinInfor.inputString, signinInfor.password);
        console.log("user : " + user)
        if (user !== null && typeof user !== 'undefined') {
            setModal({
                title: 'Login Successfully !',
                isOpen: true,
                message: 'Great ! Now let do some pool games !'
            })
            dispatch(saveUserInfor({
                isLoggedIn: true,
                tokens: user.tokens,
                user: user
            }))
            setIsDataChanged(!isDataChanged);
        } else {
            setModal({
                title: 'Login Failed !',
                isOpen: true,
                message: 'Something went wrong . Please try again !'
            })
            setIsDataChanged(!isDataChanged);
        }


    }
    function handleModalClose() {
        setModal({ ...modal, isOpen: false });
        navigate('/', {
            replace: false,
        })
    }
    function onHideHandler() {
        setModal({ ...modal, isOpen: false });
    }
    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        var id = event.currentTarget.getAttribute('name');
        if (id === 'password') {
            setSigninInfor({ ...signinInfor, password: event.currentTarget.value })
        } else {
            setSigninInfor({ ...signinInfor, inputString: event.currentTarget.value })
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
            <div className='login'>
                <form className='login-form'>
                    <h2>Login Form</h2>
                    <div className='line'></div>
                    <TextField onChange={onChangeHandler} className='txtEmail' name='usernameOrEmail' id="standard-basic" label="Email/Username" variant="standard" />
                    <TextField
                        onChange={onChangeHandler}
                        className='txtPassword'
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        name='password'
                        autoComplete="current-password"
                        variant="standard"
                    />
                    <button className='forgetPasswordBtn'>Forget Password ?</button>
                    <button className='signinBtn' onClick={onClickHandler} > Sign In</button>
                    <p>Not a member ? <Link to='/signup'>Signup</Link></p>
                </form>

                <Modal style={{
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "center",
                    "justifyContent": "center"
                }} show={modal.isOpen}
                    onHide={handleModalClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Inform</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modal.message.split('!').map(single => (
                            <p>{single}</p>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        {modal.title === 'Login Successfully !' && (
                            <Button variant="success" onClick={handleModalClose}>
                                Ok
                            </Button>
                        )}
                        {modal.title === 'Login Failed !' && (
                            <Button variant="danger" onClick={onHideHandler}>
                                Close
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default LoginView