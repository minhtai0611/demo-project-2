import styled from "./Refund.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Refund() {
    return (
        <>
            <Header />
            <main>
                Refund Page
            </main>
            <Footer />
        </>
    )
}