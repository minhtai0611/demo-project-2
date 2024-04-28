import styled from "./Discuss.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Discuss() {
    return (
        <>
            <Header />
            <main>
                Discuss Page
            </main>
            <Footer />
        </>
    )
}