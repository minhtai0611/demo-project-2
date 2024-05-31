import styled from "./Legal.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Social() {
    return (
        <>
            <Header />
            <main>
                Legal Page
            </main>
            <Footer />
        </>
    )
}