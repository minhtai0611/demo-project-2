import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo-game.png"
export default function Main() {
    return (
        <>
            <header className={styled.header}>
                <img src={logo} alt="logo game" className={styled.img} />
                <nav className={styled.nav}>
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
                </nav>
                <button type="button" className={styled.threeline + " " + styled["shippori-antique-b1-regular"]}>
                    ☰
                </button>
            </header>
            <footer>

            </footer>
        </>
    )
}