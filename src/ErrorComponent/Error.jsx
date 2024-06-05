import styled from "./Error.module.css";
import { lazy } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { BiError } from "react-icons/bi";
import { IconContext } from "react-icons";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Error() {
    const navigate = useNavigate()
    const queryResetBoundary = useQueryErrorResetBoundary()
    const retryLoading = () => {
        queryResetBoundary.reset();
        navigate(0);
    }
    const returnPrevious = () => {
        queryResetBoundary.reset();
        navigate(-1);
    }
    const returnMain = () => {
        queryResetBoundary.reset();
        navigate("..");
    }
    return (
        <>
            <Header />
            <main className={styled["manrope-bold"]}>
                <div className={styled.iconDiv}>
                    <IconContext.Provider value={{ className: styled.icon }}>
                        <BiError />
                    </IconContext.Provider>
                </div>
                <div className={styled.textDiv}>
                    <i>Oops! Something went wrong</i>
                    <br />
                    <span className={styled.explainTextSpan}>
                        We&apos;re sorry, but it looks like an error has occurred. Our team is working to fix it. Please try again later or return to main page. If you need immediate assistance, contact our support team. Thank you for your patience.
                    </span>
                </div>
                <button type="button" onClick={retryLoading} className={styled.errorButton}>Try reloading this page</button>
                <button type="button" onClick={returnPrevious} className={styled.errorButton}>Return to previous page</button>
                <button type="button" onClick={returnMain} className={styled.errorButton}>Return to main page</button>
            </main>
            {/* <Footer /> */}
        </>
    )
}