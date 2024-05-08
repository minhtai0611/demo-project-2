import styled from "./Register.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Register() {
    return (
        <>
            <Header />
            <main className={styled["nokora-bold"]}>
                <p>Create your account to join ArcGame for free, enjoy exclusive deals, meet new people and more</p>
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
                        <label htmlFor="confirmpassword" className={styled.label}>
                            Confirm password
                        </label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            placeholder="Confirm password"
                            minLength="5"
                            maxLength="20"
                            size={30}
                            autoComplete="off"
                            spellCheck="false"
                            required
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                    <div className={styled.divInput} >
                        <label htmlFor="dateofbirth" className={styled.label}>
                            Date of birth
                        </label>
                        <input
                            type="date"
                            name="dateofbirth"
                            id="dateofbirth"
                            min={`${new Date().toLocaleString("default", { year: "numeric" }) - 50}-01-01`}
                            max={`${new Date().toLocaleString("default", { year: "numeric" }) - 13}-12-31`}
                            required
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                    <div className={styled.divInput}>
                        <label htmlFor="termCondition" className={styled.checkbox}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I am 13 years of age or older and agree to the terms of the subscriber agreement and the privacy policy.
                            <input
                                name="termCondition"
                                id="termCondition"
                                type="checkbox"
                                required
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
                            required
                            className={styled["nokora-bold"] + " " + styled.input}
                        />
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
}
