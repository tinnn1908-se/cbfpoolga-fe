import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import UserService from '../services/user.service';

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
            <div>Confirmed</div>
        )
    } else if (isConfirmed === false) {
        return (
            <div>Failed</div>
        )
    } else {
        return (
            <div>Loading ...</div>
        )
    }
}

export default ConfirmEmailView