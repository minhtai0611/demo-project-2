import styled from "./Support.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Support() {
    return (
        <>
            <Header />
            <main>
                Support Page
            </main>
            <Footer />
        </>
    )
}