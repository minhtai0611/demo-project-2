import styled from "./Main.module.css";
import { Link } from "react-router-dom";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Main() {
    return (
        <>
            <Header />
            <main>
                ArcGame
            </main>
            <Footer />
        </>
    )
}