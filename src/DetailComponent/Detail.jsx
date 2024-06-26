import styled from "./Detail.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, useCallback, useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TiArrowLeftThick } from "react-icons/ti";
import { TiArrowRightThick } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";
import { SiWindows } from "react-icons/si";
import { FaLinux } from "react-icons/fa6";
import { RiAppleFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { MdPeople } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineHdrOn } from "react-icons/md";
import { FaCertificate } from "react-icons/fa6";
import { IoLogoRss } from "react-icons/io5";
import { IoLogoGameControllerB } from "react-icons/io";
import { FiCast } from "react-icons/fi";
import { PiCards } from "react-icons/pi";
import { FaCloud } from "react-icons/fa6";
import { MdOutlineDiversity3 } from "react-icons/md";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { PiVirtualReality } from "react-icons/pi";
import { GiCircleForest } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiFileEditLine } from "react-icons/ri";
import { LiaSteamSymbol } from "react-icons/lia";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { VscListUnordered } from "react-icons/vsc";
import { HiExternalLink } from "react-icons/hi";
import { FaFlag } from "react-icons/fa6";
import { SiMetacritic } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RiseLoader from "react-spinners/RiseLoader";
import parse, { domToReact } from 'html-react-parser';
import DomPurify from 'dompurify';
import { FetchGameData, FetchGameApp } from "../FetchGameDataComponent/FetchGameData";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));

// const queryGameData = (appid) => ({
//     queryKey: ["gameData", appid],
//     queryFn: async () => await FetchGameData(appid),
// })

export default function Detail() {
    const params = useParams();
    const navigate = useNavigate();

    const {
        data: dataApp,
        isError: isErrorApp,
        isPending: isPendingApp,
        isSuccess: isSuccessApp,
    } = useQuery({
        queryKey: ["gameApp"],
        queryFn: async () => await FetchGameApp(),
    });

    const [searchGame, setSearchGame] = useState("");

    let filterSearchList;
    let appid, name;
    if (isSuccessApp && searchGame) {
        filterSearchList = dataApp.filter((app) => app.name.toLowerCase().includes(searchGame.toLowerCase()));
        appid = filterSearchList.length > 0 ? filterSearchList[0].appid : "";
        name = filterSearchList.length > 0 ? filterSearchList[0].name : "";
    }

    const inputRef = useRef("");

    function SearchGameInput(event) {
        setSearchGame(() => event.target.value);
    }

    function SearchGameKeyEnter(event) {
        if (event.key === "Enter") {
            SearchGameClick();
            inputRef.current.value = "";
        }
    }

    const { data, isError, isPending, isSuccess } = useQuery({
        queryKey: ["gameData", params.appid],
        queryFn: async () => await FetchGameData(params.appid),
    });

    // const { data, isError, isPending, isSuccess } = useQuery(queryGameData(params.appid));

    const SearchGameClick = useCallback(() => {
        if (isSuccessApp && isSuccess) {
            setSearchGame(() => "");
            if (!appid || !name) {
                return;
            }
            navigate(`/app/${appid}/${name.trim().split(" ").join("_").replace(/(:|®|'|-|–|‘)/g, "")}`);
            inputRef.current.value = "";
        }
    }, [appid, isSuccess, isSuccessApp, name, navigate]);

    const FilterGameClick = useCallback((event) => {
        let filterDataApp;
        if (isSuccessApp && isSuccess && event.target.outerText) {
            setSearchGame(() => "");
            filterDataApp = dataApp.filter((app) => app.name.toLowerCase().trim().replace(/\s/g, "").includes(event.target.outerText.toLowerCase().trim().replace(/\s/g, "")))[0];
            if (!filterDataApp || !filterDataApp.appid || !filterDataApp.name) {
                return;
            }
            navigate(`/app/${filterDataApp.appid}/${filterDataApp.name.trim().split(" ").join("_").replace(/(:|®|'|-|–|‘)/g, "")}`);
            inputRef.current.value = "";
        }
    }, [dataApp, isSuccess, isSuccessApp, navigate])

    // useEffect(() => {
    //     if (isError) {
    //         navigate("/");
    //     }
    //     return;
    // }, [SearchGameClick, isError, navigate]);

    let subStringEnglish;
    let subStringChinese;
    let subStringSwedish;
    let subStringItalian;
    let subStringRussian;
    let subStringFrench;
    let subStringPortuguese;
    let subStringBrazilian;
    let subStringGerman;
    let subStringSpanish;
    let subStringPolish;

    if (isSuccess) {
        subStringEnglish = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>About the Game</h1>"));
        subStringChinese = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>關於此遊戲</h1>"));
        subStringSwedish = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Om spelet</h1>"));
        subStringItalian = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Informazioni sul gioco</h1>"));
        subStringRussian = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Об игре</h1>"));
        subStringFrench = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>À propos du jeu</h1>"));
        subStringPortuguese = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Sobre o jogo</h1>"));
        subStringBrazilian = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Acerca do jogo</h1>"));
        subStringGerman = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Über das Spiel</h1>"));
        subStringSpanish = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Acerca del juego</h1>"));
        subStringPolish = data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Informacje o&nbsp;grze</h1>"));
    }

    const options = {
        replace: (domNode) => {
            if (domNode.name === "br" && (domNode.next?.name === "h1" || !domNode.next || !domNode.parent || domNode.prev?.name === "img" || (domNode.parent?.name === "i" && domNode.next?.type === "text" && !domNode.prev?.prev))) {
                return <></>;
            }
            if (domNode.name === "h1") {
                return (
                    <div className={styled.title}>
                        {domToReact(domNode.children, options)}
                    </div>
                );
            }
            if (domNode.name === "p") {
                return (
                    <div className={styled.paragraph}>
                        {domToReact(domNode.children, options)}
                    </div>
                );
            }
            if (domNode.name === "a") {
                const { href, target } = domNode.attribs;
                return (domNode.prev?.type === "text" && domNode.next?.type === "text") || (!domNode.next && !domNode.parent) || (domNode.firstChild?.data === domNode.firstChild?.data?.toUpperCase() && domNode.next?.next?.next?.name === "img" && !domNode.next?.next?.next?.next) || (domNode.next?.next?.name === "a" || (domNode.next?.name === "p" && !domNode.next?.next)) || (domNode.firstChild?.data?.includes("http") && domNode.firstChild?.data?.includes("steampowered")) ? (
                    <>
                        {(domNode.firstChild?.data?.includes("http") && (domNode.firstChild?.data?.includes("apple") || (domNode.firstChild?.data?.includes("google"))) && domNode.firstChild?.data?.includes("app") && !domNode.parent && domNode.prev?.name === "br" && ((domNode.prev?.prev?.type === "text" && domNode.prev?.prev?.prev?.prev?.name === "ul") || (domNode.prev?.prev?.name === "a" && domNode.next?.name === "p" && !domNode.next?.next))) && <br />}
                        <a href={href} target={target} className={styled.url2}>
                            {domToReact(domNode.children, options)}
                        </a>
                    </>
                ) : (
                    <a href={href} target={target} className={styled.url}>
                        {domToReact(domNode.children, options)}
                    </a>
                );
            }
            if (domNode.name === "ul") {
                return domNode.next?.next?.name === "img" ? (
                    <div className={styled.divUl}>
                        <ul className={styled.ul2}>
                            {domToReact(domNode.children, options)}
                        </ul>
                    </div>
                ) : (
                    <div className={styled.divUl}>
                        <ul className={styled.ul}>
                            {domToReact(domNode.children, options)}
                        </ul>
                    </div>
                )
            }
            if (domNode.name === "li") {
                return (
                    <li className={styled.li}>
                        {domToReact(domNode.children, options)}
                    </li>
                )
            }
            if (domNode.type === "text" && (domNode.next?.name === "p" || !domNode.parent || domNode.parent?.name === "i" || domNode.parent?.name === "ul" || domNode.parent?.name === "strong")) {
                return (
                    <>
                        {((/\p{Lu}/gu.test(domNode.data?.replace(/\n/g, " ").trim()) && /\n/g.test(domNode.data)) || /^-+$/g.test(domNode.data?.replace(/\n/g, " ").trim()) || ((domNode.next?.name === "br" && domNode.next?.next?.type === "text" && domNode.prev && ((!domNode.data?.includes("all-new") && !domNode.data?.includes(":") && !domNode.prev?.firstChild?.data.includes("Edition")) && (!domNode.data?.includes(".") && !domNode.data?.includes("[") && !domNode.data?.includes("]")))) || (domNode.next?.name === "a" && domNode.next?.next?.type === "text" && domNode.next?.next?.next?.name === "a" && domNode.next?.next?.next?.next?.type === "text" && domNode.next?.next?.next?.next?.next?.name === "a" && domNode.next?.next?.next?.next?.next?.next?.type === "text" && domNode.next?.next?.next?.next?.next?.next?.next?.name === "a") || (domNode.next?.name === "a" && domNode.next?.next?.type === "text" && !domNode.next?.next?.next)) || (!domNode.next && domNode.prev?.name === "br" && domNode.prev?.prev?.name === "br" && domNode.prev?.prev?.prev?.type === "text") || (domNode.data.includes("•") && !domNode.next && !domNode.parent) || (domNode.next?.next?.name === "img" && domNode.next?.next?.next?.next?.name === "img" && domNode.next?.next?.next?.next?.next?.next?.name === "img" && domNode.prev?.prev?.type === "text" && domNode.prev?.prev?.prev?.prev?.type === "text" && domNode.prev?.prev?.prev?.prev?.prev?.prev?.type === "text") || (!domNode.data?.includes("•") && domNode.next?.name === "a" && !domNode.next?.next) || (domNode.data?.includes("•") && domNode.next?.name === "a" && domNode.next?.next?.next?.name === "a" && domNode.next?.next?.next?.next?.next?.name === "a") || (domNode.parent?.name === "i" && domNode.parent?.parent?.name === "strong" && !domNode.parent?.parent?.parent && !domNode.next && !domNode.prev?.prev && domNode.data?.includes("…")) || (domNode.next?.name === "br" && domNode.next?.next?.name === "br" && domNode.prev && (domNode.data?.includes("Counter-Strike") || domNode.data?.includes("•"))) || (domNode.prev?.name === "br" && domNode.prev?.prev?.name === "br" && domNode.prev?.prev?.prev?.name !== "img" && domNode.data?.includes("Truck Simulator")) || (domNode.data?.includes("●")) || (domNode.data?.includes("=====") || (domNode.prev?.prev?.data?.includes(".") && domNode.prev?.prev?.data?.includes("[") && domNode.prev?.prev?.data?.includes("]"))) || (domNode.data === "•\t" && domNode.prev?.name === "br" && domNode.prev?.prev?.name === "br" && domNode.next?.name === "strong" && domNode.next?.next?.type === "text")) && <br />}
                        <span className={styled.text}>
                            {domNode.data}
                        </span>
                        {/* {/\p{Lu}/gu.test(domNode.data?.replace(/[.]/g, "").trim()) && <br />} */}
                        {((domNode.data === domNode.data?.toUpperCase() && domNode.data.includes(".")) || ((domNode.prev?.name === "br" && domNode.prev?.prev?.name === "img") && (domNode.next?.name === "br" && domNode.next?.next?.name === "br" && domNode.next?.next?.next?.name === "strong")) || (domNode.parent?.name === "i" && domNode.parent?.parent?.name === "strong" && !domNode.parent?.parent?.parent && !domNode.next && !domNode.prev?.prev && domNode.data?.includes("…")) || (domNode.data?.includes("*") && domNode.next?.next?.data?.includes("*") && !domNode.next?.next?.next) || (domNode.data === domNode.data?.toUpperCase() && domNode.data !== "(" && domNode.next?.next?.type === "text" && ((domNode.next?.next?.next?.next?.next?.name === "img" && !domNode.data === "•\t" && !domNode.prev?.name === "br" && !domNode.prev?.prev?.name === "br" && !domNode.next?.name === "strong" && !domNode.next?.next?.type === "text") || domNode.next?.next?.next?.next?.next?.next?.name === "a")) || (domNode.next?.next?.data === domNode.next?.next?.data?.toUpperCase() && domNode.next?.next?.next?.next?.name === "a" && domNode.next?.next?.next?.next?.firstChild?.data === domNode.next?.next?.next?.next?.firstChild?.data?.toUpperCase() && domNode.next?.next?.next?.next?.next?.next?.next?.name === "img") || (domNode.data?.includes("■")) || (domNode.next?.name === "br" && domNode.next?.next?.name === "br" && domNode.next?.next?.next?.name === "br" && domNode.next?.next?.next?.next?.name === "a") || (domNode.next?.name === "br" && domNode.next?.next?.name === "br" && domNode.prev && domNode.data?.includes("•")) || (domNode.data === "------------------------------------------------------------------------------") || (domNode.data?.includes("=====") && domNode.data?.includes("End Source") && domNode.parent?.name === "i")) && <br />}
                    </>
                )
            }
            if (domNode.name === "img") {
                const { src } = domNode.attribs;
                return domNode.next?.next?.name === "img" && domNode.prev?.name === "h2" ? (
                    <>
                        <img src={src} alt="detail image" className={styled.img2 + " " + (domNode.next?.next?.name === "ul" ? styled.imgLeft : "")} />
                    </>
                ) : (
                    <>
                        <img src={src} alt="detail image" className={styled.img + " " + (domNode.next?.next?.name === "ul" ? styled.imgLeft : "") + " " + ((domNode.next?.next?.firstChild?.name !== "li" && domNode.next?.name === "br" && domNode.next?.next?.name === "ul" && domNode.next?.next?.next?.name === "br") || (domNode.prev?.prev?.prev?.name === "img" && domNode.next?.next?.name === "ul" && domNode.prev?.prev?.prev?.prev?.prev?.prev?.type !== "text") ? styled.img3 : "")} />
                    </>
                )
            }
            if (domNode.name === "i" && domNode.children.find((childNode) => {
                return childNode.type === "text" && /[*.]/.test(childNode.data) && !childNode.prev;
            })) {
                return (
                    <div>
                        <i>
                            {domToReact(domNode.children, options)}
                        </i>
                    </div>
                )
            }
            if (domNode.name === "strong") {
                return (
                    <>
                        {((/[:]/.test(domNode.firstChild?.data) && domNode.prev?.prev?.name === "br") || (domNode.children[0]?.name === "u") || (domNode.next?.next?.type === "text" && domNode.prev && (!domNode.firstChild?.data?.includes("[") && !domNode.firstChild?.data?.includes("]"))) || (!domNode.next && domNode.prev && domNode.parent?.name !== "li") || (domNode.next?.name === "br" && domNode.next?.next?.name === "ul") || (domNode.next?.type === "text" && domNode.next?.data?.includes("-") && domNode.prev?.prev?.name !== "h2" && domNode.firstChild?.data === domNode.firstChild?.data?.toUpperCase()) || (domNode.prev?.name === "br" && domNode.firstChild?.data?.includes("Stage"))) ? <br /> : ""}
                        <strong className={styled.strong}>
                            {domToReact(domNode.children, options)}
                        </strong>
                        {(/[:]/.test(domNode.firstChild.data) || (!domNode.parent && !domNode.prev) || (domNode.children[0]?.name === "u") || (domNode.next?.next?.type === "text" && domNode.prev) || (domNode.next?.next?.firstChild?.data?.includes("http") && domNode.next?.next?.firstChild?.data?.includes("=sharing"))) ? <br /> : ""}
                    </>
                )
            }
            if (domNode.name === "h2") {
                return (
                    <div className={styled.title2}>
                        {domToReact(domNode.children, options)}
                    </div>
                )
            }
            if (domNode.name === "u") {
                return (
                    <>
                        {(domNode.firstChild?.name === "strong" && domNode.firstChild?.firstChild?.type === "text") && <br />}
                        <u className={styled.u}>
                            {domToReact(domNode.children, options)}
                        </u>
                        {(domNode.firstChild?.name === "strong" && domNode.firstChild?.firstChild?.type === "text" && domNode.prev) && <br />}
                    </>
                )
            }
        }
    };

    const [systemRequire, setSystemRequire] = useState("Windows");
    function SystemRequireClick(event) {
        event.target.outerText === "Windows" && setSystemRequire(() => event.target.outerText);
        event.target.outerText === "macOS" && setSystemRequire(() => event.target.outerText);
        event.target.outerText === "SteamOS + Linux" && setSystemRequire(() => event.target.outerText);
    }

    let rating, currencyGlobalResult;
    const ratings = (isSuccess && data && data.ratings) && Object.getOwnPropertyNames(data.ratings);
    const shortCurrency = isSuccess && data.price_overview?.currency?.replace(/.$/g, "")?.trim();
    isSuccess && data.package_groups && data.package_groups.map((package_group) => {
        package_group.subs && package_group.subs.map((sub) => {
            if (!sub.is_free_license) {
                const currencyGlobalMatch = sub.option_text.match(/ (?:[\d.,\s]+)?(£|€|CDN\$|A\$|\$|R\$|S\$|Mex\$|pуб\.|HK\$|CHF|NZ\$)(?:[\d.,\s]+)?/);
                currencyGlobalResult = currencyGlobalMatch ? currencyGlobalMatch[1].trim() : "";
            }
        })
    })
    if (isSuccess && data && data.ratings) {
        if (shortCurrency === "AU" || currencyGlobalResult === "A$") {
            rating = ratings[ratings.findIndex((rating) => rating === "oflc")];
        }
        if (shortCurrency === "NZ" || currencyGlobalResult === "NZ$") {
            rating = ratings[ratings.findIndex((rating) => rating === "nzoflc")];
        }
        if ((shortCurrency === "US" || currencyGlobalResult === "$") || (shortCurrency === "CA" || currencyGlobalResult === "CDN$")) {
            rating = ratings[ratings.findIndex((rating) => rating === "esrb")];
        }
        if ((shortCurrency === "UK" || currencyGlobalResult === "£") || (shortCurrency === "CH" || currencyGlobalResult === "CHF") || (shortCurrency === "EU" || currencyGlobalResult === "€")) {
            rating = ratings[ratings.findIndex((rating) => rating === "pegi")];
        }
    }

    return (
        <>
            {isPending && (
                <RiseLoader color="#f0ffff" size={80} margin={0} speedMultiplier={0.7} cssOverride={{
                    display: "flex",
                    height: "100vh",
                    alignItems: "center",
                    justifyContent: "center",
                }} />
            )}
            {isSuccess && (
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
                                ref={inputRef}
                            />
                            <button
                                type="button"
                                onClick={(event) => SearchGameClick(event)}
                                className={styled.button + " " + styled["manrope-bold"]}
                            >
                                Search
                            </button>
                        </div>
                        {(isSuccessApp && searchGame) && (
                            filterSearchList.slice(0, 5).map((filterSearch) => {
                                return (
                                    <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.filterDiv}>
                                        <button type="button" className={styled.filterButton} onClick={(event) => FilterGameClick(event)}>
                                            {filterSearch.name}
                                        </button>
                                    </div>
                                )
                            })
                        )}
                        <ul role="list">
                            <li>{data.name}</li>
                            <li>
                                {data.movies && data.screenshots && (
                                    <Carousel
                                        autoFocus
                                        autoPlay
                                        interval={4000}
                                        infiniteLoop
                                        showIndicators={false}
                                        transitionTime={1000}
                                        thumbWidth={160}
                                        useKeyboardArrows
                                        swipeable
                                        emulateTouch
                                        dynamicHeight
                                        swipeScrollTolerance={16}
                                        preventMovementUntilSwipeScrollTolerance
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
                                                        <div key={data.movies[index].id} className={styled.thumb}>
                                                            <img src={data.movies[index].thumbnail} alt={data.movies[index].name} className={styled.imgThumb}></img>
                                                            <IconContext.Provider value={{ className: styled.iconThumb }}>
                                                                <FaPlay />
                                                            </IconContext.Provider>
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div key={data.screenshots[index - data.movies.length].id} className={styled.thumb}>
                                                            <img src={data.screenshots[index - data.movies.length].path_full} alt="screenshot" className={styled.imgThumb}></img>
                                                        </div>
                                                    )
                                                }
                                            });
                                        }}
                                        renderItem={(slideItem) => <slideItem.type {...slideItem.props} className={styled.slideItem} />}
                                        statusFormatter={(slideItem, totalSlide) => {
                                            if (slideItem < data.movies.length + 1) {
                                                return `Movie ${slideItem} of ${data.movies.length}`
                                            }
                                            else {
                                                return `Screenshot ${slideItem - data.movies.length} of ${data.screenshots.length}`
                                            }
                                        }}
                                    >
                                        {data.movies.map((movie) => (
                                            <div key={movie.id}>
                                                <p className={styled.legend}>{movie.name}</p>
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    // controls
                                                    // controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
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
                                )}
                                {!data.movies && data.screenshots && (
                                    <Carousel
                                        autoFocus
                                        autoPlay
                                        interval={4000}
                                        infiniteLoop
                                        showIndicators={false}
                                        transitionTime={2000}
                                        thumbWidth={160}
                                        useKeyboardArrows
                                        swipeable
                                        emulateTouch
                                        swipeScrollTolerance={16}
                                        preventMovementUntilSwipeScrollTolerance
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
                                            return thumbs.map((thumb, index) => {
                                                return (
                                                    <div key={data.screenshots[index].id} className={styled.thumb}>
                                                        <img src={data.screenshots[index].path_full} alt="screenshot" className={styled.imgThumb}></img>
                                                    </div>
                                                );
                                            });
                                        }}
                                        renderItem={(slideItem) => <slideItem.type {...slideItem.props} className={styled.slideItem} />}
                                        statusFormatter={(slideItem, totalSlide) => `Screenshot ${slideItem} of ${totalSlide}`}
                                    >
                                        {data.screenshots.map((screenshot) => (
                                            <div key={screenshot.id}>
                                                <img src={screenshot.path_full} alt="screenshot"></img>
                                            </div>
                                        ))}
                                    </Carousel>
                                )}
                            </li>
                            <li>
                                <img src={data.header_image} alt="header image" className={styled.imgDescription}></img>
                                <p className={styled.pDescription}>{data.short_description.replace(/&amp;/g, "&").replace(/&quot;/g, "\"")}</p>
                                <div className={styled.description}>
                                    <span>All Reviews:</span>
                                    <span>{data.recommendations ? data.recommendations.total : "No user reviews"}</span>
                                </div>
                                <div className={styled.description}>
                                    {data.release_date.date && (<span>Release Date:</span>)}
                                    <span>{data.release_date.date}</span>
                                </div>
                                <div className={styled.description}>
                                    <span>Developers: </span>
                                    <span><a href="#" className={styled.developer}>{data.developers.join(", ")}</a></span>
                                </div>
                                <div className={styled.description}>
                                    <span>Publishers: </span>
                                    <span><a href="#" className={styled.publisher}>{data.publishers.join(", ")}</a></span>
                                </div>
                            </li>
                            <li>
                                {(data.demos && data.name) && (
                                    <div className={styled.demo}>
                                        <p>
                                            Download{" "}{data.name}{" "}Demo
                                        </p>
                                        {data.platforms.windows && data.platforms.linux && data.platforms.mac && (
                                            <>
                                                <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                    <SiWindows />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                    <FaLinux />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                    <RiAppleFill />
                                                </IconContext.Provider>
                                            </>
                                        )}
                                        {data.platforms.windows && data.platforms.linux && !data.platforms.mac && (
                                            <>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <SiWindows />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <FaLinux />
                                                </IconContext.Provider>
                                            </>
                                        )}
                                        {data.platforms.windows && !data.platforms.linux && data.platforms.mac && (
                                            <>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <SiWindows />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <RiAppleFill />
                                                </IconContext.Provider>
                                            </>
                                        )}
                                        {!data.platforms.windows && data.platforms.linux && data.platforms.mac && (
                                            <>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <FaLinux />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <RiAppleFill />
                                                </IconContext.Provider>
                                            </>
                                        )}
                                        {data.platforms.windows && !data.platforms.linux && !data.platforms.mac && (
                                            <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                <SiWindows />
                                            </IconContext.Provider>
                                        )}
                                        {!data.platforms.windows && data.platforms.linux && !data.platforms.mac && (
                                            <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                <FaLinux />
                                            </IconContext.Provider>
                                        )}
                                        {!data.platforms.windows && !data.platforms.linux && data.platforms.mac && (
                                            <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                <RiAppleFill />
                                            </IconContext.Provider>
                                        )}
                                        <div className={styled.demoBox}>
                                            <span>
                                                <button type="button" className={styled.download + " " + styled["manrope-bold"]}>
                                                    Download
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {data.package_groups && data.package_groups.map((package_group) => {
                                    return package_group.subs && package_group.subs.map((sub) => {
                                        // const optionTextMatch = sub.option_text.match(/(.+?) - <span class="discount_original_price">/) || sub.option_text.match(/^(.*?) - \$\d+\.\d+$/) || sub.option_text.match(/^(.+?) - /) || sub.option_text.match(/.*/);
                                        // const optionTextMatch = sub.option_text.match(/^(.*) - (?:€|CDN\$|A\$|\$|R\$|S\$)?(?:\s+)?[\d.,]+(?:\s+)?(?:€|CDN\$|A\$|\$|R\$|S\$)?$/);
                                        const optionTextMatch = sub.option_text.match(/^(.*) - (?:<span.*?>.*?<\/span>\s*)?(?:<span class="discount_original_price">)?(?:£|€|CDN\$|A\$|\$|R\$|S\$|Mex\$|pуб\.|HK\$|CHF|NZ\$|Free|Kostenlos|免费|Gratuit)?(?:\s+)?(?:[\d.,-]+)?(?:\s+)?(?:£|€|CDN\$|A\$|\$|R\$|S\$|Mex\$|pуб\.|HK\$|CHF|NZ\$|Free|Kostenlos|免费|Gratuit)?(?:<\/span>)?$/) || sub.option_text;
                                        let optionTextResult = "";
                                        optionTextResult = optionTextMatch ? optionTextMatch[1].trim().replace(/&reg;/g, "®") : "";
                                        if (optionTextMatch === sub.option_text) {
                                            optionTextResult = sub.option_text;
                                        }
                                        const percentSavingsMatch = sub.percent_savings_text.match(/-?(\d+)/);
                                        const percentSavingsResult = percentSavingsMatch ? percentSavingsMatch[1].trim() : "";
                                        // const originPriceMatch = sub.option_text.match(/(?:<span class="discount_original_price">)?\$([\d.]+)(?:<\/span>)?/) || sub.option_text.match(/(\d{1,3}(?:,\d{3})*,\d{2})/) || sub.option_text.match(/(?:<span class="discount_original_price">)?[A-Z]{1}\$ ([\d.]+)(?:<\/span>)?/) || sub.option_text.match(/[A-Z]{1}\$ ([\d.]+)/);
                                        const originPriceMatch = sub.option_text.match(/(?: - \d+ Crown Pack)? - (?:<span class="discount_original_price">)?(?:£|€|CDN\$|A\$|\$|R\$|S\$|Mex\$|pуб\.|HK\$|CHF|NZ\$)?(?:\s+)?([\d.,-]+)(?:\s+)?(?:£|€|CDN\$|A\$|\$|R\$|S\$|Mex\$|pуб\.|HK\$|CHF|NZ\$)?(?:<\/span>)?/);
                                        const originPriceResult = originPriceMatch ? originPriceMatch[1].trim() : "";
                                        // const currencyMatch = sub.option_text.match(/(?:€|CDN\$|A\$|R\$|\$)/);
                                        // const currencyMatch = sub.option_text.match(/ - (?:\d+,\d{2})?(€|CDN\$|A\$|\$|R\$)/)
                                        // const currencyMatch = sub.option_text.match(/ - (?: [\d.,]+)?(?:\d+,\d{2})?(€|CDN\$|A\$|\$|R\$|S\$)(?: [\d.,]+)?(?: \s+)?/);
                                        const currencyMatch = sub.option_text.match(/ (?:[\d.,\s]+)?(£|€|CDN\$|A\$|\$|R\$|S\$|Mex\$|pуб\.|HK\$|CHF|NZ\$)(?:[\d.,\s]+)?/);
                                        const currencyResult = currencyMatch ? currencyMatch[1].trim() : ""
                                        const isFreeLicense = sub.is_free_license;
                                        // const subscriptionMatch = sub.option_text.match(/subscription/);
                                        // const subscriptionResult = subscriptionMatch ? subscriptionMatch[0] : "";
                                        // const autoRenewSubscriptionMatch = sub.option_text.match(/(\d+ month\(s\))/);
                                        // const autoRenewSubscriptionResult = autoRenewSubscriptionMatch ? autoRenewSubscriptionMatch[1] : "";
                                        return package_group.name === "subscriptions" ? (
                                            <div key={sub.packageid} className={styled.subscribeGame}>
                                                <span className={styled.subscribe}>{package_group.title}</span>
                                                <br />
                                                <p className={styled.pMoreInfo}>
                                                    {package_group.description && !package_group.description.includes("<a href") ? package_group.description.replace(/<br \/>\r\n/g, " ") : (
                                                        package_group.description.match(/^(.*?)<a /) && package_group.description.match(/<a [^>]*>(.*?)<\/a>/) && package_group.description.match(/<\/a>(.*)$/) && package_group.description.match(/<a .*?href="(.*?)"/) && (
                                                            <>
                                                                {package_group.description.match(/^(.*?)<a /)[1].replace(/<br \/>\r\n/g, " ")}
                                                                <a href={package_group.description.match(/<a .*?href="(.*?)"/)[1].replace(/<br \/>\r\n/g, " ")} className={styled.linkMoreInfo}>
                                                                    {package_group.description.match(/<a [^>]*>(.*?)<\/a>/)[1].replace(/<br \/>\r\n/g, " ")}
                                                                </a>
                                                                {package_group.description.match(/<\/a>(.*)$/)[1].replace(/<br \/>\r\n/g, " ")}
                                                            </>
                                                        ))
                                                    }
                                                </p>
                                                {data.platforms.windows && data.platforms.linux && data.platforms.mac && (
                                                    <>
                                                        <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                            <SiWindows />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                            <FaLinux />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                            <RiAppleFill />
                                                        </IconContext.Provider>
                                                    </>
                                                )}
                                                {data.platforms.windows && data.platforms.linux && !data.platforms.mac && (
                                                    <>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <SiWindows />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <FaLinux />
                                                        </IconContext.Provider>
                                                    </>
                                                )}
                                                {data.platforms.windows && !data.platforms.linux && data.platforms.mac && (
                                                    <>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <SiWindows />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <RiAppleFill />
                                                        </IconContext.Provider>
                                                    </>
                                                )}
                                                {!data.platforms.windows && data.platforms.linux && data.platforms.mac && (
                                                    <>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <FaLinux />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <RiAppleFill />
                                                        </IconContext.Provider>
                                                    </>
                                                )}
                                                {data.platforms.windows && !data.platforms.linux && !data.platforms.mac && (
                                                    <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                        <SiWindows />
                                                    </IconContext.Provider>
                                                )}
                                                {!data.platforms.windows && data.platforms.linux && !data.platforms.mac && (
                                                    <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                        <FaLinux />
                                                    </IconContext.Provider>
                                                )}
                                                {!data.platforms.windows && !data.platforms.linux && data.platforms.mac && (
                                                    <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                        <RiAppleFill />
                                                    </IconContext.Provider>
                                                )}
                                                {percentSavingsResult && !isFreeLicense ? <p className={styled.offer}>{`SPECIAL PROMOTION! Offer ends soon`}</p> : ""}
                                                {percentSavingsResult && !isFreeLicense && (
                                                    <div className={styled.purchaseBox}>
                                                        <span className={styled.savings}>
                                                            -{percentSavingsResult}%
                                                        </span>
                                                        <span className={styled.price}>
                                                            {optionTextResult}
                                                        </span>
                                                        <span>
                                                            <button type="button" className={styled.cart + " " + styled["manrope-bold"]}>
                                                                Add to cart
                                                            </button>
                                                        </span>
                                                    </div>
                                                )}
                                                {!percentSavingsResult && !isFreeLicense && (
                                                    <div className={styled.noSavingsPurchaseBox}>
                                                        <span className={styled.price}>
                                                            {optionTextResult}
                                                        </span>
                                                        <span>
                                                            <button type="button" className={styled.cart + " " + styled["manrope-bold"]}>
                                                                Add to cart
                                                            </button>
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div key={sub.packageid} className={styled.purchaseGame + " " + ((package_group.description && !package_group.description.includes("<a href")) && styled.packsPurchaseGame)}>
                                                {<p> {optionTextResult}</p>}
                                                {data.platforms.windows && data.platforms.linux && data.platforms.mac && (
                                                    <>
                                                        <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                            <SiWindows />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                            <FaLinux />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                            <RiAppleFill />
                                                        </IconContext.Provider>
                                                    </>
                                                )}
                                                {data.platforms.windows && data.platforms.linux && !data.platforms.mac && (
                                                    <>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <SiWindows />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <FaLinux />
                                                        </IconContext.Provider>
                                                    </>
                                                )}
                                                {data.platforms.windows && !data.platforms.linux && data.platforms.mac && (
                                                    <>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <SiWindows />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <RiAppleFill />
                                                        </IconContext.Provider>
                                                    </>
                                                )}
                                                {!data.platforms.windows && data.platforms.linux && data.platforms.mac && (
                                                    <>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <FaLinux />
                                                        </IconContext.Provider>
                                                        <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                            <RiAppleFill />
                                                        </IconContext.Provider>
                                                    </>
                                                )}
                                                {data.platforms.windows && !data.platforms.linux && !data.platforms.mac && (
                                                    <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                        <SiWindows />
                                                    </IconContext.Provider>
                                                )}
                                                {!data.platforms.windows && data.platforms.linux && !data.platforms.mac && (
                                                    <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                        <FaLinux />
                                                    </IconContext.Provider>
                                                )}
                                                {!data.platforms.windows && !data.platforms.linux && data.platforms.mac && (
                                                    <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                        <RiAppleFill />
                                                    </IconContext.Provider>
                                                )}
                                                {percentSavingsResult && !isFreeLicense ? <p className={styled.offer}>{`SPECIAL PROMOTION! Offer ends soon`}</p> : ""}
                                                {package_group.name === "CrownPakcs" && <p className={styled.pMoreInfo}>
                                                    {package_group.description && !package_group.description.includes("<a href") ? package_group.description.replace(/<br \/>\r\n/g, " ") : (
                                                        package_group.description.match(/^(.*?)<a /) && package_group.description.match(/<a [^>]*>(.*?)<\/a>/) && package_group.description.match(/<\/a>(.*)$/) && package_group.description.match(/<a .*?href="(.*?)"/) && (
                                                            <>
                                                                {package_group.description.match(/^(.*?)<a /)[1].replace(/<br \/>\r\n/g, " ")}
                                                                <a href={package_group.description.match(/<a .*?href="(.*?)"/)[1].replace(/<br \/>\r\n/g, " ")} className={styled.linkMoreInfo}>
                                                                    {package_group.description.match(/<a [^>]*>(.*?)<\/a>/)[1].replace(/<br \/>\r\n/g, " ")}
                                                                </a>
                                                                {package_group.description.match(/<\/a>(.*)$/)[1].replace(/<br \/>\r\n/g, " ")}
                                                            </>
                                                        ))
                                                    }
                                                </p>}
                                                {percentSavingsResult && !isFreeLicense && (
                                                    <div className={styled.purchaseBox}>
                                                        <span className={styled.savings}>
                                                            -{percentSavingsResult}%
                                                        </span>
                                                        {originPriceResult && currencyResult && (
                                                            <span className={styled.price}>
                                                                <s className={styled.originPrice}>{currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" || currencyResult === "Mex$" || currencyResult === "HK$" || currencyResult === "CHF" || currencyResult === "NZ$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" || currencyResult === "£" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? originPriceResult.toString().replace(".", ",") : originPriceResult.toString()}{currencyResult === "€" ? currencyResult : ""}{currencyResult === "pуб." ? " " + currencyResult : ""}</s>
                                                                {currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" || currencyResult === "Mex$" || currencyResult === "HK$" || currencyResult === "CHF" || currencyResult === "NZ$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" || currencyResult === "£" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? (Math.floor(originPriceResult.replace(",", ".") * (1 - percentSavingsResult / 100) * 100) / 100).toString().replace(".", ",") : (Math.floor(originPriceResult.replace(",", ".") * (1 - percentSavingsResult / 100) * 100) / 100).toString()}{currencyResult === "€" ? currencyResult : ""}{currencyResult === "pуб." ? " " + currencyResult : ""}
                                                            </span>
                                                        )}
                                                        <span>
                                                            <button type="button" className={styled.cart + " " + styled["manrope-bold"]}>
                                                                Add to cart
                                                            </button>
                                                        </span>
                                                    </div>
                                                )}
                                                {!percentSavingsResult && !isFreeLicense && (
                                                    <div className={styled.noSavingsPurchaseBox}>
                                                        {originPriceResult && currencyResult && (
                                                            <span className={styled.price}>
                                                                {currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" || currencyResult === "Mex$" || currencyResult === "HK$" || currencyResult === "CHF" || currencyResult === "NZ$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" || currencyResult === "£" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? originPriceResult.toString().replace(".", ",") : originPriceResult.toString()}{currencyResult === "€" ? currencyResult : ""}{currencyResult === "pуб." ? " " + currencyResult : ""}
                                                            </span>
                                                        )}
                                                        <span>
                                                            <button type="button" className={styled.cart + " " + styled["manrope-bold"]}>
                                                                Add to cart
                                                            </button>
                                                        </span>
                                                    </div>
                                                )}
                                                {!percentSavingsResult && isFreeLicense && (
                                                    <div className={styled.freePurchaseBox}>
                                                        <span className={styled.free}>
                                                            Free to play
                                                        </span>
                                                        <span>
                                                            <button type="button" className={styled.play + " " + styled["manrope-bold"]}>
                                                                Play Game
                                                            </button>
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })
                                })
                                }
                                {data.package_groups.length === 0 && data.is_free && (
                                    <div className={styled.purchaseGame}>
                                        <p>{data.name}</p>
                                        {data.platforms.windows && data.platforms.linux && data.platforms.mac && (
                                            <>
                                                <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                    <SiWindows />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                    <FaLinux />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.threeIconPlatform }}>
                                                    <RiAppleFill />
                                                </IconContext.Provider>
                                            </>
                                        )}
                                        {data.platforms.windows && data.platforms.linux && !data.platforms.mac && (
                                            <>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <SiWindows />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <FaLinux />
                                                </IconContext.Provider>
                                            </>
                                        )}
                                        {data.platforms.windows && !data.platforms.linux && data.platforms.mac && (
                                            <>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <SiWindows />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <RiAppleFill />
                                                </IconContext.Provider>
                                            </>
                                        )}
                                        {!data.platforms.windows && data.platforms.linux && data.platforms.mac && (
                                            <>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <FaLinux />
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{ className: styled.twoIconPlatform }}>
                                                    <RiAppleFill />
                                                </IconContext.Provider>
                                            </>
                                        )}
                                        {data.platforms.windows && !data.platforms.linux && !data.platforms.mac && (
                                            <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                <SiWindows />
                                            </IconContext.Provider>
                                        )}
                                        {!data.platforms.windows && data.platforms.linux && !data.platforms.mac && (
                                            <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                <FaLinux />
                                            </IconContext.Provider>
                                        )}
                                        {!data.platforms.windows && !data.platforms.linux && data.platforms.mac && (
                                            <IconContext.Provider value={{ className: styled.iconPlatform }}>
                                                <RiAppleFill />
                                            </IconContext.Provider>
                                        )}
                                        <div className={styled.freePurchaseBox}>
                                            <span className={styled.free}>
                                                Free to play
                                            </span>
                                            <span>
                                                <button type="button" className={styled.play + " " + styled["manrope-bold"]}>
                                                    Play Game
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li>
                                {data.categories && data.categories.map((category) => {
                                    return (
                                        <div key={category.id} className={styled.category}>
                                            <IconContext.Provider value={{ className: category.id === 30 ? styled.wrenchIconCategory : (category.id === 15 ? styled.statIconCategory : styled.iconCategory) }}>
                                                {category.id === 2 && <IoMdPerson />}
                                                {(category.id === 36 || category.id === 37 || category.id === 27 || category.id === 1 || category.id === 49 || category.id === 20 || category.id === 47) && <IoIosPeople />}
                                                {(category.id === 38 || category.id === 39 || category.id === 9 || category.id === 24 || category.id === 48) && <MdPeople />}
                                                {category.id === 22 && <FaCertificate />}
                                                {category.id === 35 && <TiShoppingCart />}
                                                {category.id === 44 && <IoLogoRss />}
                                                {category.id === 61 && <MdOutlineHdrOn />}
                                                {(category.id === 28 || category.id === 18) && <IoLogoGameControllerB />}
                                                {(category.id === 41 || category.id === 42 || category.id === 43) && <FiCast />}
                                                {category.id === 29 && <PiCards />}
                                                {category.id === 23 && <FaCloud />}
                                                {category.id === 62 && <MdOutlineDiversity3 />}
                                                {category.id === 30 && <HiMiniWrench />}
                                                {(category.id === 53 || category.id === 31) && <PiVirtualReality />}
                                                {category.id === 40 && <GiCircleForest />}
                                                {category.id === 8 && <BiSolidShieldAlt2 />}
                                                {category.id === 15 && <IoStatsChartSharp />}
                                                {category.id === 17 && <RiFileEditLine />}
                                                {category.id === 52 && <LiaSteamSymbol />}
                                                {category.id === 21 && <FaCircleArrowDown />}
                                                {category.id === 13 && <FaRegClosedCaptioning />}
                                                {category.id === 25 && <VscListUnordered />}
                                            </IconContext.Provider>
                                            <span className={styled.nameCategory}>{category.description}</span>
                                        </div>
                                    )
                                }
                                )}
                                {data.drm_notice && <div className={styled.notice}>Incorporates 3rd-party DRM:&nbsp;{data.drm_notice.replace(/<br>/g, "\n")}</div>}
                                {data.ext_user_account_notice && <div className={styled.notice}>Requires 3rd - Party Account:&nbsp;{data.ext_user_account_notice}</div>}
                                {data.legal_notice && <div className={styled.notice}>Requires agreement to a 3rd - party EULA<br /><a href="#" className={styled.eula}>{data.name + " " + "EULA"}</a></div>}
                            </li>
                            <li>
                                {data.reviews && <div className={styled.divReview + " " + styled.reviews}>Reviews</div>}
                                {data.reviews && !data.reviews?.match(/“([^“]*)<\/a>/g) ? data.reviews?.match(/<i>.*?<\/i>.*?(<\/a>|<br>|$)/g)?.map((review) => {
                                    return (
                                        <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.didReview}>
                                            <div className={styled.review}>
                                                <i>
                                                    {review.match(/(?<=<i>)(.*?)(?=<\/i>)/g)[0]?.replace(/&amp;/g, "&")?.replace(/&quot;/g, "\"")}
                                                </i>
                                                {review.match(/(?<=<\/i>)(.*?)(?=<\/a>|<br>|$)/g) ? (
                                                    <div>
                                                        {review.match(/(?<=<\/i>)(.*?)(?=<\/a>|<br>|$)/g)[0].replace(/<a[^>]*>|<\/a>/g, "").match(/-|–/g)[0]}
                                                        {review.match(/(?<=href=")([^"]+)(?=")/g) ?
                                                            <a href={review.match(/(?<=href=")([^"]+)(?=")/g)} className={styled.url}>
                                                                <span className={styled.name}>
                                                                    {" "}
                                                                    {review.match(/(?<=<\/i>)(.*?)(?=<\/a>|<br>|$)/g)[0].replace(/<a[^>]*>|<\/a>/g, "").replace(/–|-/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").trim()}
                                                                </span>
                                                            </a>
                                                            :
                                                            <span className={styled.name}>
                                                                {" "}
                                                                {review.match(/(?<=<\/i>)(.*?)(?=<\/a>|<br>|$)/g)[0].replace(/<a[^>]*>|<\/a>/g, "").replace(/–|-/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").trim()}
                                                            </span>
                                                        }
                                                    </div>
                                                ) : ""}
                                            </div>
                                        </div>
                                    )
                                }) : data.reviews?.match(/“([^“]*)(?:<\/a>)?/g)?.map((review) => {
                                    return (
                                        <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.didReview}>
                                            <div className={styled.review}>
                                                {review.match(/“([^”]+)”/g)[0].replace(/&amp;/g, "&").replace(/&quot;/g, "\"")}
                                                {!review.match(/(?<=<br>)(.*?)(?=<a href)/g) ? (
                                                    <>
                                                        {review.match(/(?<=href=")([^"]+)(?=")/g) && " – "}
                                                        {(!review.match(/(?<=href=")([^"]+)(?=")/g) && review.replace(/<br>/g, "").replace(/“[^“]*”/g, "")) && (
                                                            <>
                                                                <br />
                                                                {review.replace(/<br>/g, "").replace(/“[^“]*”/g, "")}
                                                            </>
                                                        )}
                                                        <a href={review.match(/(?<=href=")([^"]+)(?=")/g) && review.match(/(?<=href=")([^"]+)(?=")/g)[0].replace(/&amp;/g, "&").replace(/&quot;/g, "\"")} className={styled.url}>
                                                            <span className={styled.name}>
                                                                {review.match(/(?<=href=")([^"]+)(?=")/g) && review.match(/(?<= >)(.*?)(?=<\/a>)/g)[0].replace(/&amp;/g, "&").replace(/&quot;/g, "\"")}
                                                            </span>
                                                        </a>
                                                    </>
                                                ) : ""}
                                            </div>
                                            <div className={styled.ratingChoice}>
                                                {review.match(/(?<=<br>)(.*?)(?=<a href)/g) ? review.match(/(?<=<br>)(.*?)(?=<a href)/g)[0].replace(/&amp;/g, "&").replace(/&quot;/g, "\"") : ""}
                                                {/* {review.match(/(?<=<br>)(.*?)(?=<a href)/g)[0] ? review.match(/(?<=<br>)(.*?)(?=<a href)/g)[0].replace(/&amp;/g, "&") : ""} */}
                                                {review.match(/(?<=<br>)(.*?)(?=<a href)/g) ? (
                                                    <a href={review.match(/(?<=href=")([^"]+)(?=")/g)[0].replace(/&amp;/g, "&").replace(/&quot;/g, "\"")} className={styled.url}>
                                                        <span className={styled.name}>
                                                            {review.match(/(?<= >)(.*?)(?=<\/a>)/g)[0].replace(/&amp;/g, "&").replace(/&quot;/g, "\"")}
                                                        </span>
                                                    </a>
                                                ) : ""}
                                            </div>
                                        </div>
                                    )
                                })}
                            </li>
                            <li>
                                {data.supported_languages && (
                                    <>
                                        <div className={styled.languageTitle}>Languages:</div>
                                        <div className={styled.languageDiv}>
                                            <span className={styled.languageContent}>
                                                {data.supported_languages.match(/[^,]+/g).map((supported_language) => {
                                                    return (
                                                        <span key={Math.floor(Math.random() * 10000000).toString()}>
                                                            <br />
                                                            {supported_language.replace(/<br>.*/g, "").replace(/<\/?strong>/g, "").replace(/\*/g, "").trim()}
                                                        </span>
                                                    )
                                                })}
                                            </span>
                                            <span className={styled.languageInterface}>
                                                {"Interface"}
                                                <br />
                                                {data.supported_languages.match(/[^,]+/g).map((supported_language) => {
                                                    return (
                                                        <div key={Math.floor(Math.random() * 10000000).toString()}>
                                                            {supported_language && "✔"}
                                                            <br />
                                                        </div>
                                                    )
                                                })}
                                            </span>
                                            <span className={styled.languageFullAudio}>
                                                {"Full Audio"}
                                                <br />
                                                {data.supported_languages.match(/[^,]+/g).map((supported_language) => {
                                                    return (
                                                        <div key={Math.floor(Math.random() * 10000000).toString()}>
                                                            {supported_language.replace(/<br>.*/g, "").replace(/<\/?strong>/g, "").includes("*") && "✔"}
                                                            <br />
                                                        </div>
                                                    )
                                                })}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </li>
                            <li>
                                {data.detailed_description && (
                                    <div className={styled.detail}>
                                        {/* {data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>About the Game</h1>"))} */}
                                        {/* <div dangerouslySetInnerHTML={{ __html: data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>About the Game</h1>")) }}></div> */}
                                        {/* {parse(DomPurify.sanitize(data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>About the Game</h1>"))), options) || parse(DomPurify.sanitize(data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>關於此遊戲</h1>"))), options) || parse(DomPurify.sanitize(data.detailed_description.substring(0, data.detailed_description.indexOf("<br><h1>Om spelet</h1>"))), options)} */}
                                        {subStringEnglish ? parse(DomPurify.sanitize(subStringEnglish), options) : (subStringChinese ? parse(DomPurify.sanitize(subStringChinese), options) : (subStringSwedish ? parse(DomPurify.sanitize(subStringSwedish), options) : (subStringItalian ? parse(DomPurify.sanitize(subStringItalian), options) : (subStringRussian ? parse(DomPurify.sanitize(subStringRussian), options) : (subStringFrench ? parse(DomPurify.sanitize(subStringFrench), options) : (subStringPortuguese ? parse(DomPurify.sanitize(subStringPortuguese), options) : (subStringBrazilian ? parse(DomPurify.sanitize(subStringBrazilian), options) : (subStringGerman ? parse(DomPurify.sanitize(subStringGerman), options) : (subStringSpanish ? parse(DomPurify.sanitize(subStringSpanish), options) : (subStringPolish ? parse(DomPurify.sanitize(subStringPolish), options) : ""))))))))))}
                                    </div>
                                )}
                            </li>
                            <li>
                                {(rating && data.ratings && data.ratings[rating] && data.ratings[rating].rating && (shortCurrency || currencyGlobalResult)) && (
                                    <div className={styled.ratingDiv}>
                                        <img src={`https://store.cloudflare.steamstatic.com/public/shared/images/game_ratings/${rating?.toUpperCase()}/${data.ratings[rating]?.rating}.png?v=2`} alt="rating image"
                                            className={styled.ratingImg + " " +
                                                (data.ratings[rating]?.descriptors?.match(/[^\r\n]+/g) && data.ratings[rating]?.interactive_elements?.match(/[^\r\n]+/g) && (data.ratings[rating]?.descriptors?.match(/[^\r\n]+/g)?.length + data.ratings[rating]?.interactive_elements?.match(/[^\r\n]+/g)?.length >= 5) ? styled.ratingImgGreater :
                                                    (data.ratings[rating]?.descriptors?.match(/[^\r\n]+/g) && !data.ratings[rating]?.interactive_elements?.match(/[^\r\n]+/g) && data.ratings[rating]?.descriptors?.match(/[^\r\n]+/g)?.length >= 5 ? styled.ratingImgGreater :
                                                        (!data.ratings[rating]?.descriptors?.match(/[^\r\n]+/g) && data.ratings[rating]?.interactive_elements?.match(/[^\r\n]+/g) && data.ratings[rating]?.interactive_elements?.match(/[^\r\n]+/g)?.length >= 5 ? styled.ratingImgGreater : "")
                                                    ))} />
                                        <span className={styled.ratingDescriptor}>
                                            {data.ratings[rating]?.descriptors && !data.ratings[rating]?.interactive_elements && data.ratings[rating]?.descriptors.match(/[^\r\n]+/g).map((descriptor, index) => {
                                                return (
                                                    <span key={Math.floor(Math.random() * 10000000).toString()}>
                                                        {descriptor}
                                                        {index !== data.ratings[rating]?.descriptors.match(/[^\r\n]+/g).length - 1 && <br />}
                                                    </span>
                                                )
                                            })}
                                            {!data.ratings[rating]?.descriptors && data.ratings[rating]?.interactive_elements && data.ratings[rating]?.interactive_elements.match(/[^\r\n]+/g).map((interactive_element, index) => {
                                                return (
                                                    <>
                                                        <div className={styled.interactiveElement}>Interactive Elements</div>
                                                        <span key={Math.floor(Math.random() * 10000000).toString()}>
                                                            {interactive_element}
                                                            {index !== data.ratings[rating]?.interactive_elements.match(/[^\r\n]+/g).length - 1 && <br />}
                                                        </span>
                                                    </>
                                                )
                                            })}
                                            {data.ratings[rating]?.descriptors && data.ratings[rating]?.interactive_elements && (
                                                <>
                                                    {data.ratings[rating]?.descriptors?.match(/[^\r\n]+/g)?.map((descriptor, index) => {
                                                        return (
                                                            <span key={Math.floor(Math.random() * 10000000).toString()} className={styled.ratingDescriptor}>
                                                                {descriptor}
                                                                {index !== data.ratings[rating]?.descriptors?.match(/[^\r\n]+/g)?.length - 1 && <br />}
                                                            </span>
                                                        )
                                                    })}
                                                    <br />
                                                    <br />
                                                    <div className={styled.interactiveElement}>Interactive Elements</div>
                                                    {data.ratings[rating]?.interactive_elements?.match(/[^\r\n]+/g)?.map((interactive_element, index) => {
                                                        return (
                                                            <span key={Math.floor(Math.random() * 10000000).toString()}>
                                                                {interactive_element}
                                                                {index !== data.ratings[rating]?.interactive_elements?.match(/[^\r\n]+/g)?.length - 1 && <br />}
                                                            </span>
                                                        )
                                                    })}
                                                </>
                                            )}
                                        </span>
                                        <span className={styled.ratingCountry}>
                                            Rating for: {rating?.toUpperCase() + " " + (shortCurrency ? shortCurrency : "")}
                                        </span>
                                    </div>
                                )}
                            </li>
                            <li>
                                {data.about_the_game && <div className={styled.about}>About the game</div>}
                                {data.about_the_game && (
                                    <div className={styled.detail}>
                                        {parse(DomPurify.sanitize(data.about_the_game), options)}
                                    </div>
                                )}
                            </li>
                            <li>
                                {data.achievements && data.achievements?.total && (
                                    <div className={styled.highlightedTitle}>
                                        Includes {data.achievements?.total} Steam Achievements
                                    </div>
                                )}
                                {data.achievements && <div className={styled.highlightedDiv}>
                                    {data.achievements.highlighted.length > 0 && data.achievements.highlighted.slice(0, 3).map((highlighted) => {
                                        return (
                                            <span key={Math.floor(Math.random() * 10000000).toString()} className={styled.highlightedSpan}>
                                                <img src={highlighted.path} title={highlighted.name} alt="highlighted image" className={styled.highlightedImg} />
                                            </span>
                                        )
                                    })}
                                    {data.achievements?.total && data.steam_appid && (
                                        <span className={styled.viewMore}>
                                            <a href={`https://steamcommunity.com/stats/${data.steam_appid}/achievements`} className={styled.viewMoreA}>
                                                View all {data.achievements?.total}
                                            </a>
                                        </span>
                                    )}
                                </div>}
                            </li>
                            <li>
                                {data.content_descriptors.notes && <div className={styled.matureContent}>Mature content description</div>}
                                {data.content_descriptors.notes && (
                                    <div className={styled.detail}>
                                        The developers describe the content like this:
                                        <br />
                                        <i>
                                            {parse(DomPurify.sanitize(data.content_descriptors.notes), options)}
                                        </i>
                                    </div>
                                )}
                            </li>
                            <li>
                                {data.name && <div className={styled.name}>TITLE: {data.name}</div>}
                                {data.genres && (
                                    <div className={styled.summary}>
                                        GENRE: {data.genres?.map((genre, index) => {
                                            return (
                                                <span key={genre.id}>
                                                    <a href="#" className={styled.summaryLink}>{genre.description}</a>
                                                    {index < data.genres?.length - 1 && ", "}
                                                </span>
                                            )
                                        })}
                                    </div>
                                )}
                                {data.developers && <div className={styled.summary}>DEVELOPER:{" "}<a href="#" className={styled.summaryLink}>{data.developers.join(", ")}</a></div>}
                                {data.publishers && <div className={styled.summary}>PUBLISHER:{" "}<a href="#" className={styled.summaryLink}>{data.publishers.join(", ")}</a></div>}
                                {data.release_date && data.release_date?.date && <div className={styled.releaseDate}>RELEASE DATE:{" "}{data.release_date?.date}</div>}
                                {data.website && (
                                    <div className={styled.website}>
                                        <a href={data.website} className={styled.websiteLink}>
                                            Visit the website{" "}
                                            <IconContext.Provider value={{ className: styled.externalLinkIcon }}>
                                                <HiExternalLink />
                                            </IconContext.Provider>
                                        </a>
                                    </div>
                                )}
                                {data.steam_appid && (
                                    <div className={styled.website}>
                                        <a href={`https://store.steampowered.com/newshub/?appids=${data.steam_appid}&snr=1_5_9__408`} className={styled.websiteLink}>
                                            View update history
                                        </a>
                                    </div>
                                )}
                                {data.steam_appid && (
                                    <div className={styled.website}>
                                        <a href={`https://store.steampowered.com/newshub/app/${data.steam_appid}?snr=1_5_9__408`} className={styled.websiteLink}>
                                            Read related news
                                        </a>
                                    </div>
                                )}
                                {data.steam_appid && (
                                    <div className={styled.website}>
                                        <a href={`https://steamcommunity.com/app/${data.steam_appid}/discussions/`} className={styled.websiteLink}>
                                            View discussions
                                        </a>
                                    </div>
                                )}
                                {data.name && (
                                    <div className={styled.website}>
                                        <a href={`https://steamcommunity.com/actions/Search?T=ClanAccount&K=${data.name.replace(/\s/g, "%20").replace(/:/g, "%3A").replace(/'/g, "%27").replace(/®/g, "")}`} className={styled.websiteLink}>
                                            Find Community Groups
                                        </a>
                                    </div>
                                )}
                            </li>
                            <li>
                                {(data.pc_requirements || data.linux_requirements || data.mac_requirements) && <div className={styled.systemRequire}>System requirements</div>}
                                <menu className={styled.menu}>
                                    {(data.pc_requirements?.minimum?.includes("<li>") || data.pc_requirements?.recommended?.includes("<li>")) && ((data.mac_requirements?.minimum?.includes("<li>") || data.mac_requirements?.recommended?.includes("<li>")) || (data.linux_requirements?.minimum?.includes("<li>") || data.linux_requirements?.recommended?.includes("<li>"))) ?
                                        <button type="button" className={styled.button} onClick={(event) => SystemRequireClick(event)}>
                                            Windows
                                        </button>
                                        : ""
                                    }
                                    {(data.mac_requirements?.minimum?.includes("<li>") || data.mac_requirements?.recommended?.includes("<li>")) && ((data.pc_requirements?.minimum?.includes("<li>") || data.pc_requirements?.recommended?.includes("<li>")) || (data.linux_requirements?.minimum?.includes("<li>") || data.linux_requirements?.recommended?.includes("<li>"))) ?
                                        <button type="button" className={styled.button} onClick={(event) => SystemRequireClick(event)}>
                                            macOS
                                        </button>
                                        : ""
                                    }
                                    {(data.linux_requirements?.minimum?.includes("<li>") || data.linux_requirements?.recommended?.includes("<li>")) && ((data.pc_requirements?.minimum?.includes("<li>") || data.pc_requirements?.recommended?.includes("<li>")) || (data.mac_requirements?.minimum?.includes("<li>") || data.mac_requirements?.recommended?.includes("<li>"))) ?
                                        <button type="button" className={styled.button} onClick={(event) => SystemRequireClick(event)}>
                                            SteamOS + Linux
                                        </button>
                                        : ""
                                    }
                                </menu>
                                {systemRequire === "Windows" && (
                                    <div className={styled.systemRequireDiv}>
                                        {<span className={styled.systemRequireContent}>
                                            {data.pc_requirements?.minimum?.includes("<li>") && data.pc_requirements?.minimum?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)?.slice(1)?.map((configurationRequire, index) => {
                                                const infoRow = data.pc_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g).filter((info) => info.includes("<strong>"))[index]?.replace(/<strong>(.*?)<\/strong>/g, "")?.replace(/<br>/g, "");
                                                return (
                                                    <div key={Math.floor(Math.random() * 10000000).toString()}>
                                                        {index === 0 && data.pc_requirements?.minimum?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)[index]?.toUpperCase()?.trim()}
                                                        {(index === 0 && !data.pc_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index].includes("<strong>")) && (
                                                            <>
                                                                <br />
                                                                {data.pc_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index]?.replace(/<br>/g, "")?.trim()}
                                                            </>
                                                        )}
                                                        <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.configurationRequireDiv}>
                                                            <span className={styled.configurationRequireContent}>
                                                                {configurationRequire}
                                                            </span>
                                                            <span className={styled.configurationRequireContent}>
                                                                {infoRow?.match(/(.*?)(?=<a href)/g) ? infoRow?.match(/(.*?)(?=<a href)/g)[0] : infoRow?.trim()}
                                                                <a href={infoRow?.match(/(?<=href=")([^"]+)(?=")/g) ? infoRow?.match(/(?<=href=")([^"]+)(?=")/g)[0]?.trim() : ""} className={styled.url}>
                                                                    {infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g) ? infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g)[0]?.trim() : ""}
                                                                </a>
                                                                {infoRow?.match(/(?<=<\/a>)(.*)/g) ? infoRow?.match(/(?<=<\/a>)(.*)/g)[0] : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </span>}
                                        <span className={styled.systemRequireContent}>
                                            {data.pc_requirements?.recommended?.includes("<li>") && data.pc_requirements?.recommended?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)?.slice(1)?.map((configurationRequire, index) => {
                                                const infoRow = data.pc_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g).filter((info) => info.includes("<strong>"))[index]?.replace(/<strong>(.*?)<\/strong>/g, "")?.replace(/<br>/g, "");
                                                return (
                                                    <div key={Math.floor(Math.random() * 10000000).toString()}>
                                                        {index === 0 && data.pc_requirements?.recommended?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)[index]?.toUpperCase()?.trim()}
                                                        {(index === 0 && !data.pc_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index].includes("<strong>")) && (
                                                            <>
                                                                <br />
                                                                {data.pc_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index]?.replace(/<br>/g, "")?.trim()}
                                                            </>
                                                        )}
                                                        <div className={styled.configurationRequireDiv}>
                                                            <span className={styled.configurationRequireContent}>
                                                                {configurationRequire}
                                                            </span>
                                                            <span className={styled.configurationRequireContent}>
                                                                {infoRow?.match(/(.*?)(?=<a href)/g) ? infoRow?.match(/(.*?)(?=<a href)/g)[0] : infoRow?.trim()}
                                                                <a href={infoRow?.match(/(?<=href=")([^"]+)(?=")/g) ? infoRow?.match(/(?<=href=")([^"]+)(?=")/g)[0]?.trim() : ""} className={styled.url}>
                                                                    {infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g) ? infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g)[0]?.trim() : ""}
                                                                </a>
                                                                {infoRow?.match(/(?<=<\/a>)(.*)/g) ? infoRow?.match(/(?<=<\/a>)(.*)/g)[0] : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </span>
                                    </div>
                                )}
                                {systemRequire === "macOS" && (
                                    <div className={styled.systemRequireDiv}>
                                        <span className={styled.systemRequireContent}>
                                            {data.mac_requirements?.minimum?.includes("<li>") && data.mac_requirements?.minimum?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)?.slice(1)?.map((configurationRequire, index) => {
                                                const infoRow = data.mac_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g).filter((info) => info.includes("<strong>"))[index]?.replace(/<strong>(.*?)<\/strong>/g, "")?.replace(/<br>/g, "");
                                                return (
                                                    <div key={Math.floor(Math.random() * 10000000).toString()}>
                                                        {index === 0 && data.mac_requirements?.minimum?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)[index]?.toUpperCase()?.trim()}
                                                        {(index === 0 && !data.mac_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index].includes("<strong>")) && (
                                                            <>
                                                                <br />
                                                                {data.mac_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index]?.replace(/<br>/g, "")?.trim()}
                                                            </>
                                                        )}
                                                        <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.configurationRequireDiv}>
                                                            <span className={styled.configurationRequireContent}>
                                                                {configurationRequire}
                                                            </span>
                                                            <span className={styled.configurationRequireContent}>
                                                                {infoRow?.match(/(.*?)(?=<a href)/g) ? infoRow?.match(/(.*?)(?=<a href)/g)[0] : infoRow?.trim()}
                                                                <a href={infoRow?.match(/(?<=href=")([^"]+)(?=")/g) ? infoRow?.match(/(?<=href=")([^"]+)(?=")/g)[0]?.trim() : ""} className={styled.url}>
                                                                    {infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g) ? infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g)[0]?.trim() : ""}
                                                                </a>
                                                                {infoRow?.match(/(?<=<\/a>)(.*)/g) ? infoRow?.match(/(?<=<\/a>)(.*)/g)[0] : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </span>
                                        <span className={styled.systemRequireContent}>
                                            {data.mac_requirements?.recommended?.includes("<li>") && data.mac_requirements?.recommended?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)?.slice(1)?.map((configurationRequire, index) => {
                                                const infoRow = data.mac_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g).filter((info) => info.includes("<strong>"))[index]?.replace(/<strong>(.*?)<\/strong>/g, "")?.replace(/<br>/g, "");
                                                return (
                                                    <div key={Math.floor(Math.random() * 10000000).toString()}>
                                                        {index === 0 && data.mac_requirements?.recommended?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)[index]?.toUpperCase()?.trim()}
                                                        {(index === 0 && !data.mac_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index].includes("<strong>")) && (
                                                            <>
                                                                <br />
                                                                {data.mac_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index]?.replace(/<br>/g, "")?.trim()}
                                                            </>
                                                        )}
                                                        <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.configurationRequireDiv}>
                                                            <span className={styled.configurationRequireContent}>
                                                                {configurationRequire}
                                                            </span>
                                                            <span className={styled.configurationRequireContent}>
                                                                {infoRow?.match(/(.*?)(?=<a href)/g) ? infoRow?.match(/(.*?)(?=<a href)/g)[0] : infoRow?.trim()}
                                                                <a href={infoRow?.match(/(?<=href=")([^"]+)(?=")/g) ? infoRow?.match(/(?<=href=")([^"]+)(?=")/g)[0]?.trim() : ""} className={styled.url}>
                                                                    {infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g) ? infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g)[0]?.trim() : ""}
                                                                </a>
                                                                {infoRow?.match(/(?<=<\/a>)(.*)/g) ? infoRow?.match(/(?<=<\/a>)(.*)/g)[0] : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </span>
                                    </div>
                                )}
                                {systemRequire === "SteamOS + Linux" && (
                                    <div className={styled.systemRequireDiv}>
                                        <span className={styled.systemRequireContent}>
                                            {data.linux_requirements?.minimum?.includes("<li>") && data.linux_requirements?.minimum?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)?.slice(1)?.map((configurationRequire, index) => {
                                                const infoRow = data.linux_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g).filter((info) => info.includes("<strong>"))[index]?.replace(/<strong>(.*?)<\/strong>/g, "")?.replace(/<br>/g, "");
                                                return (
                                                    <div key={Math.floor(Math.random() * 10000000).toString()}>
                                                        {index === 0 && data.linux_requirements?.minimum?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)[index]?.toUpperCase()?.trim()}
                                                        {(index === 0 && !data.linux_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index].includes("<strong>")) && (
                                                            <>
                                                                <br />
                                                                {data.linux_requirements?.minimum?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index]?.replace(/<br>/g, "")?.trim()}
                                                            </>
                                                        )}
                                                        <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.configurationRequireDiv}>
                                                            <span className={styled.configurationRequireContent}>
                                                                {configurationRequire}
                                                            </span>
                                                            <span className={styled.configurationRequireContent}>
                                                                {infoRow?.match(/(.*?)(?=<a href)/g) ? infoRow?.match(/(.*?)(?=<a href)/g)[0] : infoRow?.trim()}
                                                                <a href={infoRow?.match(/(?<=href=")([^"]+)(?=")/g) ? infoRow?.match(/(?<=href=")([^"]+)(?=")/g)[0]?.trim() : ""} className={styled.url}>
                                                                    {infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g) ? infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g)[0]?.trim() : ""}
                                                                </a>
                                                                {infoRow?.match(/(?<=<\/a>)(.*)/g) ? infoRow?.match(/(?<=<\/a>)(.*)/g)[0] : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </span>
                                        <span className={styled.systemRequireContent}>
                                            {data.linux_requirements?.recommended?.includes("<li>") && data.linux_requirements?.recommended?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)?.slice(1)?.map((configurationRequire, index) => {
                                                const infoRow = data.linux_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g).filter((info) => info.includes("<strong>"))[index]?.replace(/<strong>(.*?)<\/strong>/g, "")?.replace(/<br>/g, "");
                                                return (
                                                    <div key={Math.floor(Math.random() * 10000000).toString()}>
                                                        {index === 0 && data.linux_requirements?.recommended?.match(/(?<=<strong>)(.*?)(?=<\/strong>)/g)[index]?.toUpperCase()?.trim()}
                                                        {(index === 0 && !data.linux_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index].includes("<strong>")) && (
                                                            <>
                                                                <br />
                                                                {data.linux_requirements?.recommended?.match(/(?<=<li>)(.*?)(?=<\/li>)/g)[index]?.replace(/<br>/g, "")?.trim()}
                                                            </>
                                                        )}
                                                        <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.configurationRequireDiv}>
                                                            <span className={styled.configurationRequireContent}>
                                                                {configurationRequire}
                                                            </span>
                                                            <span className={styled.configurationRequireContent}>
                                                                {infoRow?.match(/(.*?)(?=<a href)/g) ? infoRow?.match(/(.*?)(?=<a href)/g)[0] : infoRow?.trim()}
                                                                <a href={infoRow?.match(/(?<=href=")([^"]+)(?=")/g) ? infoRow?.match(/(?<=href=")([^"]+)(?=")/g)[0]?.trim() : ""} className={styled.url}>
                                                                    {infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g) ? infoRow?.match(/(?<= >)(.*?)(?=<\/a>)/g)[0]?.trim() : ""}
                                                                </a>
                                                                {infoRow?.match(/(?<=<\/a>)(.*)/g) ? infoRow?.match(/(?<=<\/a>)(.*)/g)[0] : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </span>
                                    </div>
                                )}
                                {data.legal_notice && <div className={styled.legalNotice}>{parse(DomPurify.sanitize(data.legal_notice), options)}</div>}
                            </li>
                            <li>
                                <div className={styled.shareEmbedDiv}>
                                    <span className={styled.shareEmbedSpan}>
                                        <button type="button" className={styled.shareEmbed}>
                                            Share
                                        </button>
                                    </span>
                                    <span className={styled.shareEmbedSpan}>
                                        <button type="button" className={styled.shareEmbed}>
                                            Embed
                                        </button>
                                    </span>
                                    <span className={styled.shareEmbedSpan}>
                                        <button type="button" className={styled.shareEmbed}>
                                            <IconContext.Provider value={{ className: styled.flagIcon }}>
                                                <FaFlag />
                                            </IconContext.Provider>
                                        </button>
                                    </span>
                                </div>
                            </li>
                            <li></li>
                            <li>
                                {data.metacritic && data.metacritic?.score && data.metacritic?.url && (
                                    <div className={styled.metacriticDiv}>
                                        <div className={styled.metacriticSpan}>
                                            <div className={styled.metacriticScore}>
                                                {data.metacritic?.score}
                                            </div>
                                        </div>
                                        <span className={styled.metacriticSpan}>
                                            <IconContext.Provider value={{ className: styled.metacriticIcon }}>
                                                <SiMetacritic />
                                            </IconContext.Provider>
                                            {" "}
                                            metacritic
                                            <br />
                                            <a href={data.metacritic?.url} className={styled.metacriticLink}>
                                                Read Critic Reviews
                                                {" "}
                                                <IconContext.Provider value={{ className: styled.externalLinkIcon }}>
                                                    <HiExternalLink />
                                                </IconContext.Provider>
                                            </a>
                                        </span>
                                    </div>
                                )}
                            </li>
                        </ul >
                    </main >
                    <Footer />
                </>
            )}
        </>
    )
}