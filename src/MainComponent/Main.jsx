import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import { lazy } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));

export default function Main() {
    return (
        <>
            <Header />
            <main className={styled["mukta-mahee-semibold"]}>
                <div className={styled.inputBox}>
                    <IconContext.Provider value={{ className: styled.icon }}>
                        <AiOutlineSearch />
                    </IconContext.Provider>
                    <input
                        type="search"
                        name="searchGame"
                        placeholder="Search a game..."
                        maxLength="20"
                        className={styled.input + " " + styled["mukta-mahee-semibold"]}
                    />
                    <Link to="/">
                        <button type="button" className={styled.button + " " + styled["mukta-mahee-semibold"]}>
                            Search
                        </button>
                    </Link>
                </div>

                <ul role="list">
                    <li>Call of Duty</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                </ul>
            </main>
            <Footer />
        </>
    );
}
