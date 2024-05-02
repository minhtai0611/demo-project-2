import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import { lazy, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useQuery } from "@tanstack/react-query";
import {
    FetchGameData,
    FetchGameApp,
} from "../FetchGameDataComponent/FetchGameData";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));

export default function Main() {
    const { data, isError, isPending, isSuccess } = useQuery({
        queryKey: ["gameData"],
        queryFn: async () => await FetchGameData(),
    });
    // if (isSuccess) console.log(data.name);
    const {
        data: dataApp,
        isError: isErrorApp,
        isPending: isPendingApp,
        isSuccess: isSuccessApp,
    } = useQuery({
        queryKey: ["gameApp"],
        queryFn: async () => await FetchGameApp(),
    });
    // if (isSuccessApp) console.log(dataApp.length);

    const [searchGame, setSearchGame] = useState("");

    function SearchGameInput(event) {
        setSearchGame(() => event.target.value);
    }

    function SearchGameKeyEnter(event) {
        if (event.key === "Enter") {
            SearchGameInput(event);
        }
    }

    function SearchGameClick() { }

    return (
        <>
            <Header />
            <main>
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
                        <button
                            type="button"
                            onClick={(event) => SearchGameClick(event)}
                            className={styled.button + " " + styled["mukta-mahee-semibold"]}
                        >
                            Search
                        </button>
                    </Link>
                </div>
                {isSuccess && isSuccessApp && (
                    <ul role="list" className={styled["manrope-bold"]}>
                        <li>{data.name}</li>
                        <li>
                            {isSuccess && isSuccessApp && data.movies.map((movie) => (
                                <video
                                    controls
                                    controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
                                    disablePictureInPicture
                                    disableRemotePlayback
                                    preload="metadata"
                                    poster={movie.thumbnail}
                                    key={movie.id}
                                >
                                    <source src={movie.mp4.max} type="video/mp4" />
                                </video>
                            ))}
                        </li>
                        <li>
                            <img src={data.header_image} alt="header image"></img>
                            <p>{data.short_description}</p>
                            <p>Release Date: {data.release_date.date}</p>
                            <p>Developers: {data.developers.join(", ")}</p>
                            <p>Publishers: {data.publishers.join(", ")}</p>
                        </li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                    </ul>
                )}
            </main>
            <Footer />
        </>
    );
}
