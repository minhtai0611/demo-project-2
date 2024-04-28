import styled from "./Header.module.css"
import { Link } from "react-router-dom";
import logo from "../assets/logo-game.png"
import { useState, useEffect } from "react"
export default function Header() {
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
        </>
    )
}