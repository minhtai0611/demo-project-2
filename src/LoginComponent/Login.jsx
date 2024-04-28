import styled from "./Login.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Login() {
    return (
        <>
            <Header />
            <main>
                Login Page
            </main>
            <Footer />
        </>
    )
}