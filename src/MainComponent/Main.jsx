import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo-game.png"
import { useEffect, useState } from "react";
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
        mediaQuery.addEventListener("change", changeMediaQuery);
        changeMediaQuery(mediaQuery);
        return () => mediaQuery.removeEventListener("change", changeMediaQuery);
    }, [])
    return (
        <>
            <header className={styled.header}>
                <Link to="/">
                    <img src={logo} alt="logo game" className={styled.img} />
                </Link>
                {(isVisible || !smallScreen) && <nav className={styled.nav}>
                    <Link to="/" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                        Store
                    </Link>
                    <Link to="/community" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                        Community
                    </Link>
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
            <footer>

            </footer>
        </>
    )
}