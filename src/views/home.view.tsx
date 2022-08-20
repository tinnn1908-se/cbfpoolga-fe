import React from 'react'
import '../css/style.css'
const HomeView = () => {

    function onAccountIconClickHandler(event: React.MouseEvent) {
        console.log("Clicked")
        document.getElementById('header__links')?.classList.toggle('header__links--active')
        document.getElementById('account')?.classList.toggle('open')
    }

    return (
        <div>
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
                                <a className="header__link" href="#">
                                    Log In
                                </a>
                                <a className="header__link" href="#">
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
            <main className="main">
                <section className="how">
                    <div className="container">
                        <h2 className="how__title section-title">How to play?</h2>
                        <p className="how__subtitle">
                            There are two ways to submit your sheets:
                        </p>
                        <div className="how__inner">
                            <div className="how__items">
                                <div className="how__item">
                                    <h4 className="how__item-title">Manually play</h4>
                                    <p className="how__item-desc">Print / Pickup sheets</p>
                                </div>
                                <div className="how__item">
                                    <h4 className="how__item-title">Play online</h4>
                                    <p className="how__item-desc">Register on the website</p>
                                </div>
                            </div>
                            <div className="how__info">
                                <div className="how__info-items">
                                    <div className="how__info-item">
                                        <p className="how__info-text">
                                            Click on NFL Sheet or and NCAAF Sheet.
                                        </p>
                                    </div>
                                    <div className="how__info-item">
                                        <p className="how__info-text">
                                            {" "}
                                            If you <span>Print - Pick Sheets</span> — pick 1 winning team
                                            from each game by{" "}
                                            <span className="black">marking a “X” in the box</span>
                                            from each pick.
                                        </p>
                                    </div>
                                    <div className="how__info-item">
                                        <p className="how__info-text">
                                            {" "}
                                            Put a total number of combined points for the tiebreaker for
                                            the last game on the sheet.
                                        </p>
                                        <p className="how__info-text --example">
                                            Example Away team <span>30 </span>– Home Team <span>10</span>.
                                            You would put <span>40</span>
                                        </p>
                                    </div>
                                    <div className="how__info-item">
                                        <p className="how__info-text">
                                            Send money via cash app: <span>$CBFPOOLGA</span>
                                        </p>
                                        <p className="how__info-text --example">
                                            (Put your unique code in Note)
                                        </p>
                                    </div>
                                </div>
                                <div className="how__info-items">
                                    <div className="how__info-item">
                                        <p className="how__info-text">
                                            If you play <span>online</span> — Pick 1 winning team from
                                            each game by pressing 1 team from each line.{" "}
                                        </p>
                                        <p className="how__info-text --example">
                                            (You will not be able to submit your sheet until ALL GAMES
                                            have been picked.)
                                        </p>
                                        <p className="how__info-note">
                                            A copy of your picks will be emailed to your registered email
                                            - This is the best way to ensure that there are no mistakes
                                            and to keep a record of your sheets. This can be done via your
                                            phone or computer.
                                        </p>
                                    </div>
                                    <div className="how__info-item">
                                        <p className="how__info-text">
                                            Come by nearest drop off location and give them your{" "}
                                            <span>unique code</span>
                                            and pay for your picks
                                        </p>
                                    </div>
                                    <div className="how__info-item">
                                        <p className="how__info-text">
                                            You can play as many picks / sheets as you want.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="timeline">
                    <div className="container">
                        <h2 className="timeline__title section-title">Timeline</h2>
                        <div className="timeline__inner">
                            <div className="timeline__info">
                                <p className="timeline__info-item">
                                    New Sheets will be available online every Tuesday
                                </p>
                                <p className="timeline__info-item">
                                    Picks must be in by Date on NFL / NCAA Sheets
                                </p>
                                <p className="timeline__info-item">
                                    The master Sheet (everyone Picks) will be available 1 day before
                                    the Game starts
                                </p>
                                <p className="timeline__info-item">
                                    Winners will be highlighted 1 day after last game
                                </p>
                                <p className="timeline__info-item">
                                    Winners will be paid 1 day after last game
                                </p>
                                <p className="timeline__info-item">
                                    <span>DO NOT CALL</span> DROP OFF LOCATIONS FOR ANY ISSUES OR
                                    PROBLEMS.{" "}
                                    <a
                                        className="timeline__info-link mail-link"
                                        href="mailto:cbfpoolga@gmail.com"
                                    >
                                        EMAIL: CBFPOOLGA@GMAIL.COM
                                    </a>
                                </p>
                            </div>
                            <img
                                className="timeline__img"
                                src="images/timeline_bg.jpg"
                                alt="timeline image"
                            />
                        </div>
                    </div>
                </section>
                <section className="rules">
                    <div className="container">
                        <h2 className="rules__title section-title">Rules regulations</h2>
                        <div className="rules__inner">
                            <img
                                className="rules__img"
                                src="images/rules_bg.jpg"
                                alt="rules image"
                            />
                            <div className="rules__info">
                                <p className="rules__info-text">
                                    Tie breaker occurs when two or more people have the least amount
                                    wrong.
                                </p>
                                <p className="rules__info-text">
                                    Best winning record for the entire week wins / ties will be
                                    determined my closet to overall score over or under.
                                </p>
                                <p className="rules__info-text --significant">
                                    PLEASE CHECK YOUR PICKS!!! IF THERE ARE ANY ISSUES, PLEASE LET ME
                                    KNOW ASAP WE WILL MAKE CHANGES ONLY ACCORDINGLY TO YOUR
                                    SHEETS/EMAILS. NO CHANGES WILL BE MADE 1HR BEFORE THE FIRST GAME.
                                </p>
                                <p className="rules__info-text">
                                    If we made a mistake, please email
                                    <a
                                        className="rules__info-link mail-link"
                                        href="mailto:cbfpoolga@gmail.com"
                                    >
                                        {" "}
                                        EMAIL: CBFPOOLGA@GMAIL.COM
                                    </a>{" "}
                                    asap. With entry # &amp; name on sheet. The entry number can be
                                    found on the master sheet under home / away column
                                </p>
                                <p className="rules__info-text">
                                    Sheets will be corrected as per what you put down.
                                </p>
                                <p className="rules__info-text">
                                    Any blank picks will automatically be picked.
                                </p>
                                <p className="rules__info-text">
                                    Any blank tiebreaker will automatically be picked at 40pts
                                </p>
                                <p className="rules__info-text">
                                    Winners will be highlighted every Tuesday morning.
                                </p>
                                <p className="rules__info-text">
                                    If any game is canceled due to any reason, then it just won't
                                    count.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cash">
                    <div className="container">
                        <h2 className="cash__title section-title">Cash App/Email rules</h2>
                        <div className="cash__items">
                            <p className="cash__text">Send money first then email your sheets.</p>
                            <p className="cash__text">
                                Cash app: <span>$CBFPOOLGA</span>
                            </p>
                            <p className="cash__text">
                                Send the name on your sheet when using cash app,{" "}
                                <span>this is the only we know which sheet is yours.</span>
                                <span className="cash__example">
                                    (Example: When you Cashapp – for “Your name” on sheet)
                                </span>
                            </p>
                            <p className="cash__text">
                                If you are emailing picks, below is an example of how they should
                                be.
                                <span className="cash__black">Name: example</span>
                                <br />
                                <span className="example--grey">
                                    1,3,5,7,9,12,13,16,18,20,22,24,26,27,29 TB: 62 <br />
                                    1,3,5,7,10,12,13,16,18,20,21,23,25,27,30 TB 64 <br />
                                    30,33,35,37,39,42,43,46,48,50,52,54,56,58,60 TB: 48
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="footer">
                <div className="container">
                    <p className="copyright">© CBFPOOLGA 2022</p>
                </div>
            </footer>
        </div>

    )
}

export default HomeView