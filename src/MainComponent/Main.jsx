import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import { lazy, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useQuery } from "@tanstack/react-query"
import { FetchGameData, FetchGameApp } from "../FetchGameDataComponent/FetchGameData";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));

export default function Main() {
    const { data, isError, isPending, isSuccess } = useQuery({
        queryKey: ["gameData"],
        queryFn: async () => await FetchGameData()
    })
    // if (isSuccess) console.log(data.name);
    const { data: dataApp, isError: isErrorApp, isPending: isPendingApp, isSuccess: isSuccessApp } = useQuery({
        queryKey: ["gameApp"],
        queryFn: async () => await FetchGameApp()
    })
    // if (isSuccessApp) console.log(dataApp.length);

    const [searchGame, setSearchGame] = useState("");

    function SearchGameInput(event) {
        setSearchGame(event.target.value);
    }

    function SearchGameKeyEnter(event) {
        if (event.key === "Enter") {
            SearchGameInput(event);
        }
    }

    function SearchGameClick() {

    }

    return (
        <>
            <Header />
            <main className={styled["mukta-mahee-semibold"]}>
                <div className={styled.inputBox}>
                    <IconContext.Provider value={{ className: styled.icon }}>
                        <AiOutlineSearch onClick={(event) => SearchGameClick(event)} />
                    </IconContext.Provider>
                    <input
                        type="search"
                        name="searchGame"
                        placeholder="Search a game..."
                        maxLength="40"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        onChange={(event) => SearchGameInput(event)}
                        onKeyDown={(event) => SearchGameKeyEnter(event)}
                        className={styled.input + " " + styled["mukta-mahee-semibold"]}
                    />
                    <Link to="/">
                        <button type="button" onClick={(event) => SearchGameClick(event)} className={styled.button + " " + styled["mukta-mahee-semibold"]}>
                            Search
                        </button>
                    </Link>
                </div>
                <p>{searchGame}</p>
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
