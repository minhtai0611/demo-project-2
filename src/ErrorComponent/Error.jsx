import styled from "./Error.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Error() {
    return (
        <>
            <Header />
            <main>
                Error Page
            </main>
            <Footer />
        </>
    )
}