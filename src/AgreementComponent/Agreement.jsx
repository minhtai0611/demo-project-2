import styled from "./Agreement.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Agreement() {
    return (
        <>
            <Header />
            <main className={styled["nokora-bold"] + " " + styled.policy}>
                <p className={styled.p}>Subscriber Agreement</p>
                <p className={styled.p}>
                    Welcome to ArcGame, an internet-based online distribution, rights
                    management, multiplayer video game, and social communication service.
                    This Subscriber Agreement governs your use of ArcGame and outlines the
                    terms and conditions under which you may access and utilize our
                    services. By accessing or using ArcGame, you agree to be bound by the
                    terms of this agreement. If you do not agree with these terms, please
                    do not use ArcGame.
                </p>
                <p className={styled.p}>1. Acceptance of Terms</p>
                <p className={styled.p}>
                    By accessing or using ArcGame, you acknowledge that you have read,
                    understood, and agree to be bound by this Subscriber Agreement and any
                    additional terms and policies referenced herein. We reserve the right
                    to modify or update this agreement at any time, and such modifications
                    will be effective immediately upon posting. It is your responsibility
                    to review this agreement periodically for changes.
                </p>
                <p className={styled.p}>2. Account Registration</p>
                <p className={styled.p}>
                    To access certain features of ArcGame, you may be required to create
                    an account. You agree to provide accurate, current, and complete
                    information during the registration process and to update your
                    information as necessary to keep it accurate and complete. You are
                    responsible for maintaining the confidentiality of your account
                    credentials and for all activities that occur under your account.
                </p>
                <p className={styled.p}>3. Use of Services</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>License</strong>: Subject to the
                    terms of this agreement, we grant you a limited, non-exclusive,
                    non-transferable, revocable license to access and use ArcGame for
                    personal, non-commercial purposes.
                </p>
                <p className={styled.p}>
                    b. <strong className={styled.strong}>Prohibited Conduct</strong>: You
                    agree not to engage in any of the following prohibited activities: -
                    Violating any applicable laws, regulations, or third-party rights. -
                    Interfering with or disrupting the integrity or performance of ArcGame
                    or its services. - Reverse engineering, decompiling, or disassembling
                    any aspect of ArcGame. - Using ArcGame for any unlawful or
                    unauthorized purpose. - Impersonating any person or entity, or falsely
                    stating or otherwise misrepresenting your affiliation with a person or
                    entity.
                </p>
                <p className={styled.p}>4. Content and Intellectual Property</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>Ownership</strong>: All content
                    and materials available on ArcGame, including but not limited to
                    games, graphics, text, images, videos, and audio, are the property of
                    ArcGame or its licensors and are protected by intellectual property
                    laws.
                </p>
                <p className={styled.p}>
                    b. <strong className={styled.strong}>User Content</strong>: By
                    submitting or posting any content on ArcGame, you grant ArcGame a
                    non-exclusive, royalty-free, perpetual, irrevocable, and fully
                    sublicensable right to use, reproduce, modify, adapt, publish,
                    translate, create derivative works from, distribute, and display such
                    content worldwide in any media.
                </p>
                <p className={styled.p}>5. Payment and Fees</p>
                <p className={styled.p}>
                    Some features or services on ArcGame may require payment of fees. By
                    subscribing to or purchasing such features or services, you agree to
                    pay all applicable fees and charges. All fees are non-refundable
                    unless otherwise specified.
                </p>
                <p className={styled.p}>6. Privacy</p>
                <p className={styled.p}>
                    Our collection and use of your personal information are governed by
                    our Privacy Policy. By using ArcGame, you consent to the collection
                    and use of your information as described in the Privacy Policy.
                </p>
                <p className={styled.p}>7. Termination</p>
                <p className={styled.p}>
                    We reserve the right to suspend or terminate your access to ArcGame at
                    any time, with or without cause, and without prior notice. Upon
                    termination, your license to use ArcGame will automatically terminate,
                    and you must cease all use of the services.
                </p>
                <p className={styled.p}>8. Disclaimer of Warranties</p>
                <p className={styled.p}>
                    ArcGame is provided on an &quot;as is&quot; and &quot;as
                    available&quot; basis, without warranties of any kind, either express
                    or implied. We do not warrant that ArcGame will be uninterrupted or
                    error-free, that defects will be corrected, or that the services will
                    meet your requirements.
                </p>
                <p className={styled.p}>9. Limitation of Liability</p>
                <p className={styled.p}>
                    In no event shall ArcGame, its affiliates, or its licensors be liable
                    for any indirect, incidental, special, consequential, or punitive
                    damages arising out of or in connection with your use of ArcGame,
                    whether based on warranty, contract, tort (including negligence), or
                    any other legal theory.
                </p>
                <p className={styled.p}>10. Governing Law and Dispute Resolution</p>
                <p className={styled.p}>
                    This Subscriber Agreement shall be governed by and construed in
                    accordance with the laws of [Jurisdiction]. Any dispute arising out of
                    or in connection with this agreement shall be resolved exclusively
                    through arbitration in accordance with the rules of [Arbitration
                    Service], with the arbitration to be held in [Location].
                </p>
                <p className={styled.p}>11. Miscellaneous</p>
                <p className={styled.p}>
                    This agreement constitutes the entire agreement between you and
                    ArcGame regarding your use of ArcGame and supersedes any prior
                    agreements between you and ArcGame relating to such use. If any
                    provision of this agreement is found to be invalid or unenforceable,
                    the remaining provisions shall remain in full force and effect.
                </p>
                <p className={styled.p}>12. Contact Us</p>
                <p className={styled.p}>
                    If you have any questions or concerns about this Subscriber Agreement
                    or our services, please contact us at{" "}
                    <a href="mailto:contact@arcgame.com" className={styled.a}>
                        contact@arcgame.com
                    </a>
                    .
                </p>
                <p className={styled.p}>
                    Thank you for using ArcGame. We are committed to explaining your
                    rights and obligations clearly and hope you to enjoy gaming experience.
                </p>
            </main>
            <Footer />
        </>
    );
}
