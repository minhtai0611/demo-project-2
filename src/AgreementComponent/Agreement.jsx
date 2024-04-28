import styled from "./Agreement.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Agreement() {
    return (
        <>
            <Header />
            <main>
                Agreement Page
            </main>
            <Footer />
        </>
    )
}