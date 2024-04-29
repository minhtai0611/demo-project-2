import styled from "./Footer.module.css"
import { Link } from "react-router-dom";
import { TfiFacebook } from "react-icons/tfi"
import { AiOutlineGoogle } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { GrLinkedin } from "react-icons/gr";
import { TfiYoutube } from "react-icons/tfi";
import { IconContext } from "react-icons";
export default function Footer() {
    return (
        <>
            <footer className={styled.footer}>
                {/* <img src={logo} alt="logo game" className={styled.footerImg + " " + styled.footerLink} /> */}
                <nav className={styled.footerNav}>
                    <Link to="/policy" className={styled.footerLink + " " + styled["kantumruy-pro-footer"]}>
                        Privacy Policy
                    </Link>
                    <Link to="/agreement" className={styled.footerLink + " " + styled["kantumruy-pro-footer"]}>
                        Subscriber Agreement
                    </Link>
                    <Link to="/refund" className={styled.footerLink + " " + styled["kantumruy-pro-footer"]}>
                        Refund
                    </Link>
                    <Link to="/recruit" className={styled.footerLink + " " + styled["kantumruy-pro-footer"]}>
                        Recruit
                    </Link>
                    <Link to="/social" className={styled.footerLink + " " + styled["kantumruy-pro-footer"]}>
                        Connect ArcGame in
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <TfiFacebook />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <AiOutlineGoogle />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <RiTwitterXLine />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <GrLinkedin />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: styled.footerIcon }}>
                            <TfiYoutube />
                        </IconContext.Provider>
                    </Link>
                </nav>
                <p className={styled.footerP + " " + styled["kantumruy-pro-footer"]}>
                    &#9400; {new Date().getFullYear()} ArcGame Company. All rights reserved. All trademarks are the property of their respective owners in the United States and other countries.
                    VAT is included (if applicable).
                </p>
            </footer>
        </>
    )
}