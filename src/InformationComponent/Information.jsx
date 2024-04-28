import styled from "./Information.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Information() {
    return (
        <>
            <Header />
            <main>
                Information Page
            </main>
            <Footer />
        </>
    )
}