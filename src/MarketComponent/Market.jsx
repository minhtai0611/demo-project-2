import styled from "./Market.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Market() {
    return (
        <>
            <Header />
            <main>
                Market Page
            </main>
            <Footer />
        </>
    )
}