import styled from "./Main.module.css";
import { Link } from "react-router-dom";
export default function Main() {
    return (
        <>
            <header className={styled.header}>
                <img alt="logo game" className={styled.img} />
                <nav className={styled.nav}>
                    <Link to="/">
                        Store
                    </Link>
                    <Link to="/community">
                        Community
                    </Link>
                    <Link to="/information">
                        Information
                    </Link>
                    <Link to="/support">
                        Support
                    </Link>
                    <Link to="/login">
                        Login
                    </Link>
                    <Link to="/register">
                        Register
                    </Link>
                </nav>
            </header>
            <footer>

            </footer>
        </>
    )
}