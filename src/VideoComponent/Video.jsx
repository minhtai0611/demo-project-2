import styled from "./Video.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Video() {
    return (
        <>
            <Header />
            <main>
                Video Page
            </main>
            <Footer />
        </>
    )
}