import styled from "./Recruit.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Recruit() {
    return (
        <>
            <Header />
            <main>
                Recruit Page
            </main>
            <Footer />
        </>
    )
}