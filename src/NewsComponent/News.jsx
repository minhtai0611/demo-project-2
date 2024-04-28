import styled from "./News.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function News() {
    return (
        <>
            <Header />
            <main>
                News Page
            </main>
            <Footer />
        </>
    )
}