import styled from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { lazy, useState, useCallback, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useQuery } from "@tanstack/react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RiseLoader from "react-spinners/RiseLoader";
import { FetchGameApp } from "../FetchGameDataComponent/FetchGameData";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));

export default function Main() {
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
        filterSearchList = dataApp.filter((app) => app.name.toLowerCase().trim().replace(/\s/g, "").includes(searchGame.toLowerCase().trim().replace(/\s/g, "")));
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

    const SearchGameClick = useCallback(() => {
        if (isSuccessApp) {
            if (!appid || !name) {
                return;
            }
            navigate(`/app/${appid}/${name.trim().split(" ").join("_").replace(/(:|®|'|-|–|‘)/g, "")}`);
            inputRef.current.value = "";
        }
    }, [appid, isSuccessApp, name, navigate]);

    const FilterGameClick = useCallback((event) => {
        let filterDataApp;
        if (isSuccessApp && event.target.outerText) {
            filterDataApp = dataApp.filter((app) => app.name.toLowerCase().trim().replace(/\s/g, "").includes(event.target.outerText.toLowerCase().trim().replace(/\s/g, "")))[0];
            if (!filterDataApp || !filterDataApp.appid || !filterDataApp.name) {
                return;
            }
            navigate(`/app/${filterDataApp.appid}/${filterDataApp.name.trim().split(" ").join("_").replace(/(:|®|'|-|–|‘)/g, "")}`);
            inputRef.current.value = "";
        }
    }, [dataApp, isSuccessApp, navigate])

    // useEffect(() => {
    //     if (isErrorApp) {
    //         navigate("/");
    //     }
    //     return;
    // }, [SearchGameClick, isErrorApp, navigate]);

    return (
        <>
            {isPendingApp && (
                <RiseLoader color="#f0ffff" size={80} margin={0} speedMultiplier={0.7} cssOverride={{
                    display: "flex",
                    height: "100vh",
                    alignItems: "center",
                    justifyContent: "center",
                }} />
            )}
            {isSuccessApp && (
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
                    </main >
                </>
            )}
            {isSuccessApp && <div className={styled.mainContent}></div>}
            {isSuccessApp && <Footer />}
        </>
    );
}
