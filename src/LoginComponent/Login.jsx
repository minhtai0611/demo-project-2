import styled from "./Login.module.css";
import { lazy } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginUser } from "../AuthenticationComponent/Authentication";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Oval } from 'react-loading-icons'

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Login() {
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: async (loginData) => await LoginUser(loginData),
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["login"] }),
        mutationKey: ["loginKey"]
    });

    // const location = useLocation();
    const navigate = useNavigate();
    async function LoginUserClick(event) {
        await event.preventDefault();
        const loginForm = new FormData(event.target);
        const loginData = Object.fromEntries(loginForm.entries());
        const loginAction = mutateAsync(loginData, {
            onSuccess: async (resolveData) => await resolveData
        });
        toast.promise(loginAction, {
            loading: () => "Checking your login information, please wait...",
            success: (resolveData) => {
                if (resolveData?.data) {
                    setTimeout(() => toast.loading("Redirecting to dashboard page...", {
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
                    setTimeout(() => navigate("/"), 7000);
                    return `Great, your account is logged in successfully!`;
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

    return (
        <>
            <Header />
            <main className={styled["nokora-bold"]}>
                <p className={styled.p}>Login to your account</p>
                <form className={styled.formInput} onSubmit={async (event) => await LoginUserClick(event)}>
                    <div className={styled.divInput}>
                        <label htmlFor="username" className={styled.label}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username"
                            size={30}
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                    <div className={styled.divInput}>
                        <label htmlFor="password" className={styled.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            size={30}
                            autoComplete="off"
                            spellCheck="false"
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                    <div className={styled.divInput}>
                        <input
                            type="submit"
                            name="login"
                            id="login"
                            value="Login"
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                </form>
                <Toaster
                    position="bottom-left"
                    reverseOrder={true}
                    toastOptions={{
                        style: {
                            maxWidth: "50rem",
                            textAlign: "justify"
                        }
                    }}
                />
            </main>
            <Footer />
        </>
    )
}