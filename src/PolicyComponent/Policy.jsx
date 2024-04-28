import styled from "./Policy.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Policy() {
    return (
        <>
            <Header />
            <main>
                Policy Page
            </main>
            <Footer />
        </>
    )
}