import styled from "./Social.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Social() {
    return (
        <>
            <Header />
            <main>
                Social Page
            </main>
            <Footer />
        </>
    )
}