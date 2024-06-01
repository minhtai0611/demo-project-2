import styled from "./Legal.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Social() {
    return (
        <>
            <Header />
            <main className={styled["nokora-bold"] + " " + styled.legal}>
                <p className={styled.legalTitle}>LEGAL INFO</p>
                <p className={styled.legalMainP}>COPYRIGHT</p>
                <p className={styled.legalP}>© 2024 ArcGame Corporation. All rights reserved. ArcGame, the ArcGame logo, ArcWorld, the ArcWorld logo, ArcSocial, the ArcSocial logo, ArcStore, and the ArcStore logo are trademarks and/or registered trademarks of ArcGame Corporation. All other trademarks are property of their respective owners.</p>
                <p className={styled.legalMainP}>THIRD-PARTY LEGAL NOTICES</p>
                <p className={styled.legalP}>ArcGame and other ArcGame products distributed via ArcGame use certain third-party materials that require notifications about their license terms. You can find a list of these notifications in the file called ThirdPartyLegalNotices.doc distributed with the ArcGame client and/or a particular ArcGame product. Where license terms require ArcGame to make source code available for redistribution, the code may be found here. Some geospatial data on this website is provided by geonames.org.</p>
                <p className={styled.legalMainP}>CLAIMS OF COPYRIGHT INFRINGEMENT</p>
                <p className={styled.legalP}>ArcGame respects the intellectual property rights of others, and we ask that everyone using our internet sites and services do the same. Anyone who believes that their work has been reproduced in one of our internet sites or services in a way that constitutes copyright infringement may notify ArcGame via this page.</p>
                <p className={styled.legalP}>More information about U.S. copyright law can be found at the United States Copyright Office: <a href="http://lcweb.loc.gov/copyright/" target="_blank" className={styled.legalLink}>http://lcweb.loc.gov/copyright/</a></p>
                <p className={styled.legalMainP}>SOFTWARE LICENSES</p>
                <p className={styled.legalP}>ArcGame products may include software and services provided by third parties, which are subject to separate licensing terms. Users must comply with all third-party software licenses in addition to ArcGame's terms of service. These third-party licenses are included within the ArcGame client and are accessible via the ThirdPartyLegalNotices.doc file.</p>
                <p className={styled.legalMainP}>USER-GENERATED CONTENT</p>
                <p className={styled.legalP}>By submitting any user-generated content to ArcGame, you grant ArcGame a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content worldwide in any media. You represent and warrant that you own or have the necessary rights to grant this license and that your content does not infringe the intellectual property rights of any third party.</p>
                <p className={styled.legalMainP}>DMCA POLICY</p>
                <p className={styled.legalP}>ArcGame complies with the Digital Millennium Copyright Act (DMCA) and responds to notices of alleged copyright infringement in accordance with the DMCA. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our DMCA Agent with the following information:</p>
                <menu className={styled.legalMenu}>
                    <li className={styled.legalList}>A physical or electronic signature of the person authorized to act on behalf of the owner of the copyright interest.</li>
                    <li className={styled.legalList}>A description of the copyrighted work that you claim has been infringed.</li>
                    <li className={styled.legalList}>A description of where the material that you claim is infringing is located on the site.</li>
                    <li className={styled.legalList}>Your address, telephone number, and email address.</li>
                    <li className={styled.legalList}>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                    <li className={styled.legalList}>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                </menu>
                <p className={styled.legalP}>You can contact our DMCA Agent via email at <a href="mailto:dmca@arcgame.com" className={styled.legalLink}>dmca@arcgame.com</a></p>
                <p className={styled.legalMainP}>TRADEMARK INFORMATION</p>
                <p className={styled.legalP}>ArcGame trademarks and service marks, including but not limited to ArcGame, the ArcGame logo, ArcWorld, ArcSocial, and ArcStore, are protected by law. Unauthorized use of these trademarks is strictly prohibited and may violate trademark law.</p>
                <p className={styled.legalMainP}>THIRD-PARTY TRADEMARKS</p>
                <p className={styled.legalP}>All third-party trademarks, service marks, logos, and trade names appearing on ArcGame are the property of their respective owners. Use of these trademarks is subject to permission from their respective owners.</p>
                <p className={styled.legalMainP}>CONTACT INFORMATION</p>
                <p className={styled.legalP}>For any questions or concerns about this Legal Notice or any of ArcGame&apos;s policies, please contact us at: <a href="mailto:legal@arcgame.com" className={styled.legalLink}>legal@arcgame.com</a></p>
                <p className={styled.legalP}>Thank you for using ArcGame. We are committed to providing a secure and enjoyable gaming experience. Please review this Legal Notice periodically for updates and changes.</p>
                <p className={styled.legalP}>
                    Revision Date:{" "}
                    {new Date(2024, 3, 15).toLocaleString("default", { month: "long" })}{" "}
                    {new Date(2024, 3, 15).toLocaleString("default", { day: "numeric" })},{" "}
                    {new Date(2024, 3, 15).toLocaleString("default", { year: "numeric" })}
                </p>
            </main>
            <Footer />
        </>
    )
}