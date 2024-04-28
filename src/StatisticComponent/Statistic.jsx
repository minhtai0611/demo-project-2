import styled from "./Statistic.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Statistic() {
    return (
        <>
            <Header />
            <main>
                Statistic Page
            </main>
            <Footer />
        </>
    )
}