import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import { lazy, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TiArrowLeftThick } from "react-icons/ti";
import { TiArrowRightThick } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";
import { SiWindows } from "react-icons/si";
import { FaLinux } from "react-icons/fa6";
import { RiAppleFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FetchGameData, FetchGameApp } from "../FetchGameDataComponent/FetchGameData";

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
                                    renderItem={(slideItem, options) => <slideItem.type {...slideItem.props} className={styled.slideItem} />}
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
                                    renderItem={(slideItem, options) => <slideItem.type {...slideItem.props} className={styled.slideItem} />}
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
                            <img src={data.header_image} alt="header image"></img>
                            <p>{data.short_description.replace(/&amp;/g, "&")}</p>
                            {data.release_date.date && <p>Release Date: {data.release_date.date}</p>}
                            <p>Developers: {data.developers.join(", ")}</p>
                            <p>Publishers: {data.publishers.join(", ")}</p>
                        </li>
                        <li>
                            {data.package_groups && data.package_groups.map((package_group) => {
                                return package_group.subs && package_group.subs.map((sub) => {
                                    const optionTextMatch = sub.option_text.match(/(.+?) - <span class="discount_original_price">/) || sub.option_text.match(/^(.*?) - \$\d+\.\d+$/) || sub.option_text.match(/^(.+?) - /) || sub.option_text.match(/.*/);
                                    const optionTextResult = optionTextMatch ? optionTextMatch[1].trim() : "";
                                    const percentSavingsMatch = sub.percent_savings_text.match(/-?(\d+)/);
                                    const percentSavingsResult = percentSavingsMatch ? percentSavingsMatch[1].trim() : "";
                                    // const originPriceMatch = sub.option_text.match(/(?:<span class="discount_original_price">)?\$([\d.]+)(?:<\/span>)?/) || sub.option_text.match(/(\d{1,3}(?:,\d{3})*,\d{2})/) || sub.option_text.match(/(?:<span class="discount_original_price">)?[A-Z]{1}\$ ([\d.]+)(?:<\/span>)?/) || sub.option_text.match(/[A-Z]{1}\$ ([\d.]+)/);
                                    const originPriceMatch = sub.option_text.match(/ - (?:<span class="discount_original_price">)?(?:€|CDN\$|A\$|\$|R\$|S\$)?(?:\s+)?([\d.,]+)(?:\s+)?(?:€|CDN\$|A\$|\$|R\$|S\$)?(?:<\/span>)?/)
                                    const originPriceResult = originPriceMatch ? originPriceMatch[1].trim() : "";
                                    // const currencyMatch = sub.option_text.match(/(?:€|CDN\$|A\$|R\$|\$)/);
                                    // const currencyMatch = sub.option_text.match(/ - (?:\d+,\d{2})?(€|CDN\$|A\$|\$|R\$)/)
                                    // const currencyMatch = sub.option_text.match(/ - (?: [\d.,]+)?(?:\d+,\d{2})?(€|CDN\$|A\$|\$|R\$|S\$)(?: [\d.,]+)?(?: \s+)?/);
                                    const currencyMatch = sub.option_text.match(/ (?:[\d.,\s]+)?(€|CDN\$|A\$|\$|R\$|S\$)(?:[\d.,\s]+)?/)
                                    const currencyResult = currencyMatch ? currencyMatch[1].trim() : ""
                                    const isFreeLicense = sub.is_free_license;
                                    return (
                                        <div key={sub.packageid} className={styled.purchaseGame}>
                                            <p>{optionTextResult}</p>
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
                                                    {originPriceResult && currencyResult && (
                                                        <span className={styled.price}>
                                                            <s className={styled.originPrice}>{currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? originPriceResult.toString().replace(".", ",") : originPriceResult.toString()}{currencyResult === "€" ? currencyResult : ""}</s>
                                                            {currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? (Math.floor(originPriceResult.replace(",", ".") * (1 - percentSavingsResult / 100) * 100) / 100).toString().replace(".", ",") : (Math.floor(originPriceResult.replace(",", ".") * (1 - percentSavingsResult / 100) * 100) / 100).toString()}{currencyResult === "€" ? currencyResult : ""}
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
                                                            {currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? originPriceResult.toString().replace(".", ",") : originPriceResult.toString()}{currencyResult === "€" ? currencyResult : ""}
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
                        </li>
                        <li>
                            {data.categories && data.categories.map((category) => {
                                return (
                                    <div key={category.id} className={styled.category}>
                                        <IconContext.Provider value={{ className: styled.iconCategory }}>
                                            <AiOutlineSearch />
                                        </IconContext.Provider>
                                        <span className={styled.nameCategory}>{category.description}</span>
                                    </div>
                                )
                            }
                            )}
                        </li>
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
