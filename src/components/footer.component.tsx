import React, { useState } from 'react'

const Footer = () => {

    const [scrollBtnToggle, setScrollBtnToggle] = useState<Boolean>(false);

    async function onClickHandler(event: React.MouseEvent) {
        const scrollButton = document.getElementById('scrollToTopBtn');
        if (event.currentTarget.getAttribute('id') === 'scrollToTopBtn') {
            if (scrollBtnToggle) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                if (scrollButton) {
                    scrollButton.style.transform = "rotate(180deg)";
                }
                setScrollBtnToggle(!scrollBtnToggle);
            } else {
                window.scrollTo({
                    top: 15650,
                    behavior: 'smooth',
                });
                if (scrollButton) {
                    scrollButton.style.transform = "rotate(360deg)";
                }
                setScrollBtnToggle(!scrollBtnToggle);
            }
        }
    }

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 812) {
            setScrollBtnToggle(true);
            const scrollButton = document.getElementById('scrollToTopBtn');
            if (scrollButton) {
                scrollButton.style.transform = "rotate(180deg)";
            }
        } else {
            setScrollBtnToggle(false);
            const scrollButton = document.getElementById('scrollToTopBtn');
            if (scrollButton) {
                scrollButton.style.transform = "rotate(360deg)";
            }
        }
    })

    return (
        <footer className="footer">
            <div className="container">
                <p className="copyright">© CBFPOOLGA 2022</p>
                <button className='footer__container__pageUp' id='scrollToTopBtn' onClick={onClickHandler} >
                    &#8595;
                </button>
            </div>
        </footer>
    )
}

export default Footer