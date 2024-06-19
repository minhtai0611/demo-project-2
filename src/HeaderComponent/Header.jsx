import styled from "./Header.module.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-game.png"
import { useState, useEffect, useCallback, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast';
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Oval } from 'react-loading-icons'
import { LogoutUser } from "../AuthenticationComponent/Authentication";
import { StateDataContext } from "../CreateContextComponent/CreateContext";

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [smallScreen, setSmallScreen] = useState(false);
    const toggleThreeLine = function () {
        setIsVisible(() => !isVisible);
    }
    const changeMediaQuery = function (mediaQuery) {
        if (mediaQuery.matches) {
            setSmallScreen(true);
        }
        else {
            setSmallScreen(false);
        }
    }
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 60rem)");
        mediaQuery.addEventListener("change", () => changeMediaQuery(mediaQuery));
        return () => mediaQuery.removeEventListener("change", changeMediaQuery);
    }, [])

    const [loginAuth, setLoginAuth] = useState(
        <Link to="/login" className={styled.link + " " + styled["shippori-antique-b1-regular"] + " " + styled.auth}>
            Login
        </Link>
    );
    const [registerAuth, setRegisterAuth] = useState(
        <Link to="/register" className={styled.link + " " + styled["shippori-antique-b1-regular"] + " " + styled.auth}>
            Register
        </Link>
    );
    const [isLogout, setIsLogout] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const currentURL = location.pathname;
    const { stateLoginData, stateLogoutData } = useContext(StateDataContext);

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: async ({ userid, token }) => await LogoutUser(userid, token),
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["logout"] }),
        mutationKey: ["logoutKey"]
    });
    const LogoutUserClick = useCallback(async (event) => {
        await event.preventDefault();
        if (stateLoginData.length > 0) {
            const validateUser = { userid: stateLoginData[stateLoginData.length - 1]?.data?.loginUser?.userid, token: stateLoginData[stateLoginData.length - 1]?.data?.loginUser?.token };
            const logoutAction = mutateAsync(validateUser, {
                onSuccess: async (resolveData) => {
                    if (event.target.outerText === "Logout") {
                        setIsLogout(true);
                    }
                    return await resolveData;
                }
            });
            toast.promise(logoutAction, {
                loading: () => "Logging out your account, please wait...",
                success: (resolveData) => {
                    if (resolveData?.data && resolveData?.data?.logoutUser && resolveData?.data?.logoutUser?.userid && resolveData?.data?.logoutUser?.isAuth && resolveData?.data?.logoutUser?.isAuth && resolveData?.data?.logoutUser?.userid === validateUser.userid) {
                        setTimeout(() => toast.loading("Redirecting to login page...", {
                            style: {
                                outline: "none",
                                border: "none",
                                color: "azure",
                                backgroundColor: "deepskyblue",
                                fontSize: "1.2rem"
                            },
                            duration: 2000,
                            icon: (
                                <Oval stroke="#f0ffff" strokeOpacity={0.6} speed={0.7} width={"2rem"} height={"2rem"} strokeWidth={"0.35rem"} />
                            )
                        }), 4000);
                        setTimeout(() => {
                            setLoginAuth(
                                <Link to="/login" className={styled.link + " " + styled["shippori-antique-b1-regular"] + " " + styled.auth}>
                                    Login
                                </Link>
                            );
                            setRegisterAuth(
                                <Link to="/register" className={styled.link + " " + styled["shippori-antique-b1-regular"] + " " + styled.auth}>
                                    Register
                                </Link>
                            );
                            return navigate("/login");
                        }, 7000);
                        return `Great, your account is logged out successfully!`;
                    }
                    else {
                        throw `${resolveData?.errors[0]?.message}`;
                    }
                },
                error: (validateError) => validateError
            }, {
                loading: {
                    style: {
                        outline: "none",
                        border: "none",
                        color: "azure",
                        backgroundColor: "deepskyblue",
                        fontSize: "1.2rem"
                    },
                    duration: 2000,
                    icon: (
                        <Oval stroke="#f0ffff" strokeOpacity={0.6} speed={0.7} width={"2rem"} height={"2rem"} strokeWidth={"0.35rem"} />
                    )
                },
                success: {
                    style: {
                        outline: "none",
                        border: "none",
                        color: "azure",
                        backgroundColor: "springgreen",
                        fontSize: "1.2rem"
                    },
                    duration: 2000,
                    icon: (
                        <IconContext.Provider value={{ className: styled.toastIcon }}>
                            <FaCheckCircle />
                        </IconContext.Provider>
                    )
                },
                error: {
                    style: {
                        outline: "none",
                        border: "none",
                        color: "azure",
                        backgroundColor: "crimson",
                        fontSize: "1.2rem"
                    },
                    duration: 2000,
                    icon: (
                        <IconContext.Provider value={{ className: styled.toastIcon }}>
                            <AiFillCloseCircle />
                        </IconContext.Provider>
                    )
                }
            })
        }
    }, [mutateAsync, navigate, stateLoginData]);

    useEffect(() => {
        if (stateLoginData.length > 0 && stateLoginData[stateLoginData.length - 1]?.data && stateLoginData[stateLoginData.length - 1]?.data?.loginUser && stateLoginData[stateLoginData.length - 1]?.data?.loginUser?.userid && stateLoginData[stateLoginData.length - 1]?.data?.loginUser?.token && stateLoginData.filter((mutateLogin) => mutateLogin?.data).length > stateLogoutData.filter((mutateLogout) => mutateLogout?.data).length) {
            if (currentURL !== "/login") {
                const delayTimeout = setTimeout(() => {
                    setLoginAuth(<></>);
                    setRegisterAuth(
                        <button type="button" onClick={LogoutUserClick} className={styled.logoutButton + " " + styled["shippori-antique-b1-regular"] + " " + styled.auth}>
                            Logout
                        </button>
                    );
                }, 0);
                return () => clearTimeout(delayTimeout);
            }
            else if (currentURL === "/login") {
                const delayTimeout = setTimeout(() => {
                    setLoginAuth(<></>);
                    setRegisterAuth(
                        <button type="button" onClick={LogoutUserClick} className={styled.logoutButton + " " + styled["shippori-antique-b1-regular"] + " " + styled.auth}>
                            Logout
                        </button>
                    );
                }, 7000);
                return () => clearTimeout(delayTimeout);
            }
        }
        if (currentURL === "/policy" && ((stateLoginData.length === 0 && stateLogoutData.length === 0) || (stateLogoutData.length > 0 && stateLogoutData[stateLogoutData.length - 1]?.data && stateLogoutData[stateLogoutData.length - 1]?.data?.logoutUser && stateLogoutData[stateLogoutData.length - 1]?.data?.logoutUser?.userid && stateLogoutData[stateLogoutData.length - 1]?.data?.logoutUser?.isAuth && stateLoginData.filter((mutateLogin) => mutateLogin?.data).length === stateLogoutData.filter((mutateLogout) => mutateLogout?.data).length))) {
            if (!isLogout) {
                const delayTimeout = setTimeout(() => navigate("/login"), 0);
                return () => clearTimeout(delayTimeout);
            }
        }
    }, [LogoutUserClick, currentURL, isLogout, navigate, stateLoginData, stateLogoutData]);

    return (
        <>
            <header className={styled.header}>
                <Link to="/" className={styled.link}>
                    <img src={logo} alt="logo game" className={styled.img} />
                </Link>
                {(isVisible || !smallScreen) && <nav className={styled.nav}>
                    <div className={styled.dropdown}>
                        {/* <button type="button" className={styled.dropdownMenu + " " + styled.button + " " + styled["shippori-antique-b1-regular"]}>
                            Store
                        </button> */}
                        <input type="checkbox" id="dropdown-store" className={styled.checkbox} />
                        <label htmlFor="dropdown-store" className={styled.dropdownMenu + " " + styled.button + " " + styled["shippori-antique-b1-regular"]}>
                            <span>Store</span>
                        </label>
                        <ul className={styled.menu}>
                            <li>
                                <Link to="/discovery" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Discovery
                                </Link>
                            </li>
                            <li>
                                <Link to="/news" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link to="/statistic" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Statistic
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styled.dropdown}>
                        <input type="checkbox" id="dropdown-community" className={styled.checkbox} />
                        <label htmlFor="dropdown-community" className={styled.dropdownMenu + " " + styled.button + " " + styled["shippori-antique-b1-regular"]}>
                            <span>Community</span>
                        </label>
                        <ul className={styled.menu}>
                            <li>
                                <Link to="/discuss" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Discuss
                                </Link>
                            </li>
                            <li>
                                <Link to="/market" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Market
                                </Link>
                            </li>
                            <li>
                                <Link to="/video" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                                    Video
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link to="/information" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                        Information
                    </Link>
                    <Link to="/support" className={styled.link + " " + styled["shippori-antique-b1-regular"]}>
                        Support
                    </Link>
                    {loginAuth}
                    {registerAuth}
                </nav>}
                <button type="button" onClick={toggleThreeLine} className={styled.threeline + " " + styled["shippori-antique-b1-regular"]}>
                    ☰
                </button>
                <Toaster
                    position="bottom-left"
                    reverseOrder={true}
                    toastOptions={{
                        style: {
                            maxWidth: "50rem",
                            textAlign: "justify"
                        }
                    }}
                    containerClassName={styled["nokora-bold"]}
                />
            </header>
        </>
    )
}