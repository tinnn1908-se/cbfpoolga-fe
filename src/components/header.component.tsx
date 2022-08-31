
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { AppDispatch, authSelector } from '../redux/store';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { signout } from '../redux/slices/auth.slice';

const Header = () => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const auth = useSelector(authSelector);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    function onNavigateHandler(event: React.MouseEvent) {
        var id = event.currentTarget.getAttribute('id');
        if (id === 'purchasedNav') {
            navigate('/orderhistory')
        } else {
            navigate('/profile')
        }
    }
    function logoutHandler(event: React.MouseEvent) {
        dispatch(signout());
        navigate('/')
    }
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    function onAccountIconClickHandler(event: React.MouseEvent) {
        console.log("Clicked")
        document.getElementById('header__links')?.classList.toggle('header__links--active')
        document.getElementById('account')?.classList.toggle('open')
    }
    function onClickHandler(event: React.MouseEvent) {
        var id = event.currentTarget.getAttribute('id');
        if (id === 'signin') {
            navigate('/login')
        } else if (id === 'signup') {
            navigate('/signup')
        } else if (id === 'signout') {
            dispatch(signout());
            navigate('/')
        }
    }
    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="header__top-inner">
                        <a className="header__logo" href="#">
                            <img
                                className="logo__img"
                                src="/images/logo.svg"
                                alt="logo"
                                title="logo"
                            />
                        </a>
                        <nav className="buttons">
                            {/* <a className="buttons__link" href="https://cbfpoolga.com/NFLSheet">
                                NFL SHEETS
                            </a> */}
                            <Link className="buttons__link" to='/nflsheetview'>NFL SHEETS</Link>
                            
                            
                            <a className="buttons__link" href="https://cbfpoolga.com/NFLMaster">
                                NCAAF SHEETS
                            </a>
                            <Link className="buttons__link link-master" to='/nflmasterview'>NFL MASter</Link>
                            {/* <a
                                className="buttons__link link-master"
                                href="https://cbfpoolga.com/NCCASheet"
                            >
                                NFL MASTER
                            </a> */}
                            <a
                                className="buttons__link link-master"
                                href="https://cbfpoolga.com/NCCAMaster"
                            >
                                NCAAF MASTER
                            </a>
                        </nav>
                        {
                            ((auth.isLoggedIn && auth.user) ? (
                                <div id='header__links' className="header__links">
                                    <a style={{ 'cursor': 'pointer ', 'color': '#fff' }} className="header__link" id='signout' onClick={onClickHandler} >
                                        Sign Out
                                    </a>
                                </div>
                            ) : (
                                <div id='header__links' className="header__links">
                                    <a style={{ 'cursor': 'pointer ', 'color': '#fff' }} className="header__link" id='signin' onClick={onClickHandler} >
                                        Sign In
                                    </a>
                                    <a style={{ 'cursor': 'pointer ', 'color': '#fff' }} className="header__link" id='signup' onClick={onClickHandler}>
                                        Sign Up
                                    </a>
                                </div>
                            ))
                        }
                        <div id='account' className="account" onClick={onAccountIconClickHandler}>
                            <img
                                className="account__img"
                                src="images/account.svg"
                                alt="account icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className="header__title">
                    Your #1 <br />
                    football pool
                </h1>
            </div>
        </header>
    )
}

export default Header