import styled from "./Register.module.css";
import { lazy, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterUser } from "../AuthenticationComponent/Authentication";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Oval } from 'react-loading-icons'

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Register() {
    const [isRotate, setIsRotate] = useState(false);

    function SelectRotateClick() {
        setIsRotate(() => !isRotate);
    }

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: async (registerData) => await RegisterUser(registerData),
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["register"] }),
        mutationKey: ["registerKey"]
    });

    async function RegisterUserClick(event) {
        await event.preventDefault();
        const registerForm = new FormData(event.target);
        const registerData = Object.fromEntries(registerForm.entries());
        const registerAction = mutateAsync(registerData, {
            onSuccess: async (resolveData) => await resolveData
        });
        toast.promise(registerAction, {
            loading: () => "Validating your registration information, please wait...",
            success: (resolveData) => {
                if (resolveData?.data) {
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
                    setTimeout(() => navigate("/login"), 7000);
                    return `Great, your account is registered successfully!`;
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
                <p className={styled.p}>Create your account to join ArcGame for free, enjoy exclusive deals, meet new people and more</p>
                <form className={styled.formInput} onSubmit={async (event) => await RegisterUserClick(event)}>
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
                        <label htmlFor="confirmPassword" className={styled.label}>
                            Confirm password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            size={30}
                            autoComplete="off"
                            spellCheck="false"
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                    <div className={styled.divInput} >
                        <label htmlFor="dateOfBirth" className={styled.label}>
                            Date of birth
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            min={`${new Date().toLocaleString("default", { year: "numeric" }) - 50}-01-01`}
                            max={`${new Date().toLocaleString("default", { year: "numeric" }) - 13}-12-31`}
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                    <div className={styled.divInput + " " + (isRotate ? styled.upRotate : styled.downRotate)} onClick={(event) => SelectRotateClick(event)}>
                        <label htmlFor="country" className={styled.label}>Country</label>
                        <select name="country" id="country" className={styled.select}>
                            <option value="US" className={styled.option}>US</option>
                            <option value="UK" className={styled.option}>UK</option>
                            <option value="Europe" className={styled.option}>Europe</option>
                            <option value="Canada" className={styled.option}>Canada</option>
                            <option value="Australia" className={styled.option}>Australia</option>
                            <option value="Brazil" className={styled.option}>Brazil</option>
                            <option value="Singapore" className={styled.option}>Singapore</option>
                            <option value="Mexico" className={styled.option}>Mexico</option>
                            <option value="Russia" className={styled.option}>Russia</option>
                        </select>
                        <span></span>
                    </div>
                    <div className={styled.divInput}>
                        <label htmlFor="termCondition" className={styled.checkbox}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I am 13 years of age or older and agree to the terms of the subscriber agreement and the privacy policy.
                            <input
                                name="termCondition"
                                id="termCondition"
                                type="checkbox"
                                className={styled["nokora-bold"] + " " + styled.input}
                            />
                            <span className={styled.mark}></span>
                        </label>
                    </div>
                    <div className={styled.divInput}>
                        <input
                            type="submit"
                            name="register"
                            id="register"
                            value="Create account"
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
    );
}
