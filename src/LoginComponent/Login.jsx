import styled from "./Login.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Login() {
    return (
        <>
            <Header />
            <main className={styled["nokora-bold"]}>
                <p className={styled.p}>Login to your account</p>
                <form className={styled.formInput}>
                    <div className={styled.divInput}>
                        <label htmlFor="username" className={styled.label}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username"
                            minLength="5"
                            maxLength="20"
                            size={30}
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            required
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
                            minLength="5"
                            maxLength="20"
                            size={30}
                            autoComplete="off"
                            spellCheck="false"
                            required
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                    <div className={styled.divInput}>
                        <input
                            type="submit"
                            name="login"
                            id="login"
                            value="Login"
                            required
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                </form>
            </main>
            <Footer />
        </>
    )
}