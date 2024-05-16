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
import { useQuery } from "@tanstack/react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RiseLoader from "react-spinners/RiseLoader";
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

    // const review = data.reviews.match(/“[^”]+”/g);
    // const ratingChoice = data.reviews.match(/\d+(?:[.,]\d+)?\/\d+(?: &amp; Editors Choice)?/g);
    // const url = data.reviews.match(/href="([^"]+)"/g);
    // const name = data.reviews.match(/>([^<]+)<\/a>/g);

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
                                <p>All Reviews: {data.recommendations ? data.recommendations.total : "No user reviews"}</p>
                                {data.release_date.date && <p>Release Date: {data.release_date.date}</p>}
                                <p>Developers: <a href="#" className={styled.developer}>{data.developers.join(", ")}</a></p>
                                <p>Publishers: <a href="#" className={styled.publisher}>{data.publishers.join(", ")}</a></p>
                            </li>
                            <li>
                                {data.package_groups && data.package_groups.map((package_group) => {
                                    return package_group.subs && package_group.subs.map((sub) => {
                                        // const optionTextMatch = sub.option_text.match(/(.+?) - <span class="discount_original_price">/) || sub.option_text.match(/^(.*?) - \$\d+\.\d+$/) || sub.option_text.match(/^(.+?) - /) || sub.option_text.match(/.*/);
                                        // const optionTextMatch = sub.option_text.match(/^(.*) - (?:€|CDN\$|A\$|\$|R\$|S\$)?(?:\s+)?[\d.,]+(?:\s+)?(?:€|CDN\$|A\$|\$|R\$|S\$)?$/);
                                        const optionTextMatch = sub.option_text.match(/^(.*) - (?:<span.*?>.*?<\/span>\s*)?(?:<span class="discount_original_price">)?(?:£|€|CDN\$|A\$|\$|R\$|S\$|Free|Kostenlos|免费)?(?:\s+)?(?:[\d.,]+)?(?:\s+)?(?:£|€|CDN\$|A\$|\$|R\$|S\$|Free|Kostenlos|免费)?(?:<\/span>)?$/) || sub.option_text;
                                        let optionTextResult = "";
                                        optionTextResult = optionTextMatch ? optionTextMatch[1].trim().replace(/&reg;/g, "®") : "";
                                        if (optionTextMatch === sub.option_text) {
                                            optionTextResult = sub.option_text;
                                        }
                                        const percentSavingsMatch = sub.percent_savings_text.match(/-?(\d+)/);
                                        const percentSavingsResult = percentSavingsMatch ? percentSavingsMatch[1].trim() : "";
                                        // const originPriceMatch = sub.option_text.match(/(?:<span class="discount_original_price">)?\$([\d.]+)(?:<\/span>)?/) || sub.option_text.match(/(\d{1,3}(?:,\d{3})*,\d{2})/) || sub.option_text.match(/(?:<span class="discount_original_price">)?[A-Z]{1}\$ ([\d.]+)(?:<\/span>)?/) || sub.option_text.match(/[A-Z]{1}\$ ([\d.]+)/);
                                        const originPriceMatch = sub.option_text.match(/ - (?:<span class="discount_original_price">)?(?:£|€|CDN\$|A\$|\$|R\$|S\$)?(?:\s+)?([\d.,]+)(?:\s+)?(?:£|€|CDN\$|A\$|\$|R\$|S\$)?(?:<\/span>)?/);
                                        const originPriceResult = originPriceMatch ? originPriceMatch[1].trim() : "";
                                        // const currencyMatch = sub.option_text.match(/(?:€|CDN\$|A\$|R\$|\$)/);
                                        // const currencyMatch = sub.option_text.match(/ - (?:\d+,\d{2})?(€|CDN\$|A\$|\$|R\$)/)
                                        // const currencyMatch = sub.option_text.match(/ - (?: [\d.,]+)?(?:\d+,\d{2})?(€|CDN\$|A\$|\$|R\$|S\$)(?: [\d.,]+)?(?: \s+)?/);
                                        const currencyMatch = sub.option_text.match(/ (?:[\d.,\s]+)?(£|€|CDN\$|A\$|\$|R\$|S\$)(?:[\d.,\s]+)?/)
                                        const currencyResult = currencyMatch ? currencyMatch[1].trim() : ""
                                        const isFreeLicense = sub.is_free_license;
                                        // const subscriptionMatch = sub.option_text.match(/subscription/);
                                        // const subscriptionResult = subscriptionMatch ? subscriptionMatch[0] : "";
                                        // const autoRenewSubscriptionMatch = sub.option_text.match(/(\d+ month\(s\))/);
                                        // const autoRenewSubscriptionResult = autoRenewSubscriptionMatch ? autoRenewSubscriptionMatch[1] : "";
                                        return optionTextMatch === sub.option_text ? (
                                            <div key={sub.packageid} className={styled.subscribeGame}>
                                                <span className={styled.subscribe}>{package_group.title}</span>
                                                <br />
                                                <p>{package_group.description.replace(/<br \/>\r\n/g, " ")}</p>
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
                                            <div key={sub.packageid} className={styled.purchaseGame}>
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
                                                {percentSavingsResult && !isFreeLicense && (
                                                    <div className={styled.purchaseBox}>
                                                        <span className={styled.savings}>
                                                            -{percentSavingsResult}%
                                                        </span>
                                                        {originPriceResult && currencyResult && (
                                                            <span className={styled.price}>
                                                                <s className={styled.originPrice}>{currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" || currencyResult === "£" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? originPriceResult.toString().replace(".", ",") : originPriceResult.toString()}{currencyResult === "€" ? currencyResult : ""}</s>
                                                                {currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" || currencyResult === "£" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? (Math.floor(originPriceResult.replace(",", ".") * (1 - percentSavingsResult / 100) * 100) / 100).toString().replace(".", ",") : (Math.floor(originPriceResult.replace(",", ".") * (1 - percentSavingsResult / 100) * 100) / 100).toString()}{currencyResult === "€" ? currencyResult : ""}
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
                                                                {currencyResult === "CDN$" || currencyResult === "A$" || currencyResult === "R$" ? currencyResult + " " : ""}{currencyResult === "$" || currencyResult === "S$" || currencyResult === "£" ? currencyResult : ""}{currencyResult === "€" || currencyResult === "R$" ? originPriceResult.toString().replace(".", ",") : originPriceResult.toString()}{currencyResult === "€" ? currencyResult : ""}
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
                                                {category.id === 53 && <PiVirtualReality />}
                                                {category.id === 40 && <GiCircleForest />}
                                                {category.id === 8 && <BiSolidShieldAlt2 />}
                                                {category.id === 15 && <IoStatsChartSharp />}
                                                {category.id === 17 && <RiFileEditLine />}
                                                {category.id === 52 && <LiaSteamSymbol />}
                                                {category.id === 21 && <FaCircleArrowDown />}
                                                {category.id === 13 && <FaRegClosedCaptioning />}
                                            </IconContext.Provider>
                                            <span className={styled.nameCategory}>{category.description}</span>
                                        </div>
                                    )
                                }
                                )}
                                {data.drm_notice && <div className={styled.notice}>Incorporates 3rd-party DRM:&nbsp;{data.drm_notice}</div>}
                                {data.ext_user_account_notice && <div className={styled.notice}>Requires 3rd - Party Account:&nbsp;{data.ext_user_account_notice}</div>}
                                {data.legal_notice && <div className={styled.notice}>Requires agreement to a 3rd - party EULA<br /><a href="#" className={styled.eula}>{data.name + " " + "EULA"}</a></div>}
                            </li>
                            <li>
                                <div className={styled.reviews}>Reviews</div>
                                {data.reviews && (data.reviews.match(/“[^”]+”/g) && data.reviews.match(/\d+(?:[.,]\d+)?\/\d+(?: &amp; Editors Choice)?/g) && data.reviews.match(/href="([^"]+)"/g) && data.reviews.match(/>([^<]+)<\/a>/g)) && data.reviews.match(/“[^”]+”/g).map((review, index) => {
                                    return (
                                        <div key={Math.floor(Math.random() * 10000000).toString()}>
                                            <div className={styled.review}>
                                                {data.reviews.match(/“[^”]+”/g)[index].replace(/&amp;/g, "&")}
                                            </div>
                                            <span className={styled.ratingChoice}>
                                                {data.reviews.match(/\d+(?:[.,]\d+)?\/\d+(?: &amp; Editors Choice)?/g)[index].replace(/&amp;/g, "&")}
                                            </span>
                                            <a href={data.reviews.match(/href="([^"]+)"/g)[index].slice(6, -1).replace(/&amp;/g, "&")} className={styled.url}>
                                                <span className={styled.name}>
                                                    {" - " + data.reviews.match(/>([^<]+)<\/a>/g)[index].slice(1, -4).replace(/&amp;/g, "&")}
                                                </span>
                                            </a>
                                        </div>
                                    )
                                })}
                                {/* {data.reviews && data.reviews.match(/“[^”]+”/g) && data.reviews.match(/“[^”]+”/g).map((review, index) => {
                                    // return <div key={Math.floor(Math.random() * 10000000).toString()} className={styled.review}>{review}</div>
                                    return <div key={`Quote ${index} - ${review}`} className={styled.review}>{review.replace(/&amp;/g, "&")}</div>
                                })}
                                {data.reviews && data.reviews.match(/\d+(?:[.,]\d+)?\/\d+(?: &amp; Editors Choice)?/g) && data.reviews.match(/\d+(?:[.,]\d+)?\/\d+(?: &amp; Editors Choice)?/g).map((ratingChoice, index) => {
                                    return <div key={`Rating & Choice ${index} - ${ratingChoice}`} className={styled.review}>{ratingChoice.replace(/&amp;/g, "&")}</div>
                                })}
                                {data.reviews && data.reviews.match(/href="([^"]+)"/g) && data.reviews.match(/href="([^"]+)"/g).map((url, index) => {
                                    return <div key={`URL ${index} - ${url}`} className={styled.review}>{url.slice(6, -1).replace(/&amp;/g, "&")}</div>
                                })}
                                {data.reviews && data.reviews.match(/>([^<]+)<\/a>/g) && data.reviews.match(/>([^<]+)<\/a>/g).map((name, index) => {
                                    return <div key={`URL ${index} - ${name}`} className={styled.review}>{name.slice(1, -4).replace(/&amp;/g, "&")}</div>
                                })} */}
                            </li>
                            <li>LANGUAGE</li>
                            <li>DETAIL DESCRIPTION</li>
                            <li>RATINGS</li>
                            <li>ABOUT THE GAME</li>
                            <li>ACHIEVEMENTS</li>
                            <li>SYSTEM REQUIREMENTS</li>
                            <li>ITEMS</li>
                            <li></li>
                            <li>SUMMARY</li>
                            <li></li>
                            <li>SHARE EMBED</li>
                            <li></li>
                            <li>METACRITIC</li>
                            <li></li>
                            <li>AWARD</li>
                        </ul >
                    </main >
                    <Footer />
                </>
            )}
        </>
    );
}
