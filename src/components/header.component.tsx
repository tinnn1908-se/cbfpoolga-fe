import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();

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
                                src="images/logo.svg"
                                alt="logo"
                                title="logo"
                            />
                        </a>
                        <nav className="buttons">
                            <a className="buttons__link" href="https://cbfpoolga.com/NFLSheet">
                                NFL SHEETS
                            </a>
                            <a className="buttons__link" href="https://cbfpoolga.com/NFLMaster">
                                NCAAF SHEETS
                            </a>
                            <a
                                className="buttons__link link-master"
                                href="https://cbfpoolga.com/NCCASheet"
                            >
                                NFL MASTER
                            </a>
                            <a
                                className="buttons__link link-master"
                                href="https://cbfpoolga.com/NCCAMaster"
                            >
                                NCAAF MASTER
                            </a>
                        </nav>
                        <div id='header__links' className="header__links">
                            <a style={{ 'cursor': 'pointer ' }} className="header__link" id='signin' onClick={onClickHandler} >
                                Sign In
                            </a>
                            <a style={{ 'cursor': 'pointer ' }} className="header__link" id='signup' onClick={onClickHandler}>
                                Sign Up
                            </a>
                        </div>
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