import styled from "./Register.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Register() {
    return (
        <>
            <Header />
            <main>
                Register Page
            </main>
            <Footer />
        </>
    )
}