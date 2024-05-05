import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import { lazy, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TiArrowLeftThick } from "react-icons/ti";
import { TiArrowRightThick } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useQuery } from "@tanstack/react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
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

    const [selectMovie, setSelectMovie] = useState(null);

    function MovieThumbClick(movie) {
        setSelectMovie(movie);
    }

    return (
        <>
            <Header />
            <main className={styled["manrope-bold"]}>
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
                        className={styled.input + " " + styled["manrope-bold"]}
                    />
                    <Link to="/">
                        <button
                            type="button"
                            onClick={(event) => SearchGameClick(event)}
                            className={styled.button + " " + styled["manrope-bold"]}
                        >
                            Search
                        </button>
                    </Link>
                </div>
                {isSuccess && isSuccessApp && (
                    <ul role="list">
                        <li>{data.name}</li>
                        <li>
                            <Carousel
                                autoFocus
                                showArrows={true}
                                showStatus={false}
                                showIndicators={false}
                                showThumbs={true}
                                transitionTime={1000}
                                thumbWidth={200}
                                useKeyboardArrows={true}
                                renderArrowPrev={(prevArrowClick, hasPrev) => (
                                    <IconContext.Provider
                                        value={{
                                            className: hasPrev
                                                ? styled.leftArrow
                                                : styled.leftArrowHidden,
                                        }}
                                    >
                                        <TiArrowLeftThick onClick={prevArrowClick} />
                                    </IconContext.Provider>
                                )}
                                renderArrowNext={(nextArrowClick, hasNext) => (
                                    <IconContext.Provider
                                        value={{
                                            className: hasNext
                                                ? styled.rightArrow
                                                : styled.rightArrowHidden,
                                        }}
                                    >
                                        <TiArrowRightThick onClick={nextArrowClick} />
                                    </IconContext.Provider>
                                )}
                                renderThumbs={(thumbs) => {
                                    const concatThumbs = thumbs[0].concat(thumbs[1]);
                                    return concatThumbs.map((concatThumb, index) => {
                                        if (index < data.movies.length) {
                                            return (
                                                <div key={data.movies[index].id}>
                                                    <img src={data.movies[index].thumbnail} alt={data.movies[index].name}></img>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div key={data.screenshots[index - data.movies.length].id}>
                                                    <img src={data.screenshots[index - data.movies.length].path_full} alt="screenshot"></img>
                                                </div>
                                            )
                                        }
                                    });
                                }}
                            >
                                {data.movies.map((movie) => (
                                    <div key={movie.id}>
                                        <p className={styled.legend}>{movie.name}</p>
                                        <video
                                            controls
                                            controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
                                            disablePictureInPicture
                                            disableRemotePlayback
                                            preload="metadata"
                                            poster={movie.thumbnail}
                                        >
                                            <source src={movie.mp4.max} type="video/mp4" />
                                            <source src={movie.webm.max} type="video/webm" />
                                            Sorry, your browser doesn&apos;t support videos.
                                        </video>
                                    </div>
                                ))}
                                {data.screenshots.map((screenshot) => (
                                    <div key={screenshot.id}>
                                        <img src={screenshot.path_full} alt="screenshot"></img>
                                    </div>
                                ))}
                            </Carousel>
                        </li>
                        <li>
                            <img src={data.header_image} alt="header image"></img>
                            <p>{data.short_description}</p>
                            <p>Release Date: {data.release_date.date}</p>
                            <p>Developers: {data.developers.join(", ")}</p>
                            <p>Publishers: {data.publishers.join(", ")}</p>
                        </li>
                        <li>
                            {/* <Carousel autoFocus autoPlay interval="5000" infiniteLoop showStatus={false} showIndicators={false} showThumbs={false}>
                                <div>
                                    <img src="https://cdn.akamai.steamstatic.com/steam/apps/264710/ss_883a98ad56021ce409219e1b749818866b6115cd.600x338.jpg?t=1700522118" />
                                </div>
                                <div>
                                    <img src="https://cdn.akamai.steamstatic.com/steam/apps/264710/ss_883a98ad56021ce409219e1b749818866b6115cd.600x338.jpg?t=1700522118" />
                                </div>
                                <div>
                                    <img src="https://cdn.akamai.steamstatic.com/steam/apps/264710/ss_883a98ad56021ce409219e1b749818866b6115cd.600x338.jpg?t=1700522118" />
                                </div>
                            </Carousel> */}
                            4
                        </li>
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
