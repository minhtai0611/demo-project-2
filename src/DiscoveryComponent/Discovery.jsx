import styled from "./Discovery.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Discovery() {
    return (
        <>
            <Header />
            <main>
                Discovery Page
            </main>
            <Footer />
        </>
    )
}