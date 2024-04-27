import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo-game.png"
import { useEffect, useState } from "react";
import { TfiFacebook } from "react-icons/tfi"
import { AiOutlineGoogle } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { GrLinkedin } from "react-icons/gr";
import { TfiYoutube } from "react-icons/tfi";
import { IconContext } from "react-icons";
export default function Main() {
    const [isVisible, setIsVisible] = useState(true);
    const [smallScreen, setSmallScreen] = useState(false);
    const toggleThreeLine = function () {
        setIsVisible(() => !isVisible);
    }
    const changeMediaQuery = function (mediaQuery) {
        if (mediaQuery.matches) {
            setSmallScreen(true);
        }
        else {
            setSmallScreen(false);
        }
    }
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 60rem)");
        mediaQuery.addEventListener("change", () => changeMediaQuery(mediaQuery));
        return () => mediaQuery.removeEventListener("change", changeMediaQuery);
    }, [])
    return (
        <>
            <header className={styled.header}>
                <Link to="/" className={styled.link}>
                    <img src={logo} alt="logo game" className={styled.img} />
                </Link>
                {(isVisible || !smallScreen) && <nav className={styled.nav}>
                    <div className={styled.dropdown}>
                        {/* <button type="button" className={styled.dropdownMenu + " " + styled.button + " " + styled["shippori-antique-b1-regular"]}>
                            Store
                        </button> */}
                        <input type="checkbox" id="dropdown-store" />
                        <label htmlFor="dropdown-store" className={styled.dropdownMenu + " " + styled.button + " " + styled["shippori-antique-b1-regular"]}>
                            <span>Store</span>
                        </label>
                        <ul className={styled.menu}>
                            <li>
                                <Link to="/discovery" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Discovery
                                </Link>
                            </li>
                            <li>
                                <Link to="/news" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link to="/statistic" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Statistic
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styled.dropdown}>
                        <input type="checkbox" id="dropdown-community" />
                        <label htmlFor="dropdown-community" className={styled.dropdownMenu + " " + styled.button + " " + styled["shippori-antique-b1-regular"]}>
                            <span>Community</span>
                        </label>
                        <ul className={styled.menu}>
                            <li>
                                <Link to="/discuss" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Discuss
                                </Link>
                            </li>
                            <li>
                                <Link to="/market" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Market
                                </Link>
                            </li>
                            <li>
                                <Link to="/livestream" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Livestream
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/information" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                        Information
                    </Link>
                    <Link to="/support" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                        Support
                    </Link>
                    <Link to="/login" className={styled.link + " " + styled["shippori-antique-b1-regular"] + " " + styled.auth}>
                        Login
                    </Link>
                    <Link to="/register" className={styled.link + " " + styled["shippori-antique-b1-regular"] + " " + styled.auth}>
                        Register
                    </Link>
                </nav>}
                <button type="button" onClick={toggleThreeLine} className={styled.threeline + " " + styled["shippori-antique-b1-regular"]}>
                    ☰
                </button>
            </header>
            <main>
                <p>Hello</p>
            </main>
            <footer className={styled.footer}>
                {/* <img src={logo} alt="logo game" className={styled.footerImg + " " + styled.footerLink} /> */}
                <nav className={styled.footerNav}>
                    <Link to="/information" className={styled.footerLink + " " + styled["ysabeau-office-footer"]}>
                        About ArcGame
                    </Link>
                    <Link to="/" className={styled.footerLink + " " + styled["ysabeau-office-footer"]}>
                        Store
                    </Link>
                    <Link to="/support" className={styled.footerLink + " " + styled["ysabeau-office-footer"]}>
                        Support
                    </Link>
                    <Link to="/recruit" className={styled.footerLink + " " + styled["ysabeau-office-footer"]}>
                        Recruit
                    </Link>
                    <Link to="/" className={styled.footerLink + " " + styled["ysabeau-office-footer"]}>
                        Connect ArcGame in
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <TfiFacebook />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <AiOutlineGoogle />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <RiTwitterXLine />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <GrLinkedin />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <TfiYoutube />
                        </IconContext.Provider>
                    </Link>
                </nav>
                <p className={styled.footerP + " " + styled["ysabeau-office-footer"]}>
                    &#9400; {new Date().getFullYear()} ArcGame Company. All rights reserved. All trademarks are the property of their respective owners in the United States and other countries.
                    VAT is included (if applicable).
                </p>
            </footer>
        </>
    )
}