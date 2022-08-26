import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UserService from '../services/user.service';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import '../css/confirmEmail.scss'
import { MutatingDots } from 'react-loader-spinner'
import '../css/loading.scss'
const ConfirmEmailView = () => {
    const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);
    const { token } = useParams();
    useEffect(() => {
        // send authentication request
        console.log('ConfirmEmailView')
        console.log("token : " + token);
        async function getEmailVerified() {
            if (token) {
                console.log("token : " + token);
                var isVerifiedEmail = await UserService.verifyEmail(token);
                console.log('isVerifiedEmail : ' + isVerifiedEmail)
                if (isVerifiedEmail) {
                    setIsConfirmed(true)
                } else {
                    setIsConfirmed(false);
                }
            }
        }
        getEmailVerified();

    }, [])

    if (isConfirmed) {
        return (
            <div className='confirm-inform-success'>
                <VerifiedOutlinedIcon />
                <p>Congratulation . Your email account has been verified !</p>
                <Link to="/login">Sign in now</Link>
            </div>
        )
    } else if (isConfirmed === false) {
        return (
            <div className='confirm-inform-failed'>
                <ErrorOutlineOutlinedIcon />
                <p>Sorry . Something went wrong ! Please try again !</p>
                <Link to="/signup">Sign in now</Link>
            </div>
        )
    } else {
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
    }
}

export default ConfirmEmailView