import styled from "./Policy.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Policy() {
    return (
        <>
            <Header />
            <main className={styled["nokora-bold"] + " " + styled.policy}>
                <p className={styled.p}>Privacy Policy</p>
                <p className={styled.p}>
                    Welcome to ArcGame, an internet-based online distribution, rights
                    management, multiplayer video game, and social communication service.
                    At ArcGame, we are committed to protecting your privacy and ensuring
                    the security of your personal information. This Privacy Policy
                    outlines how we collect, use, disclose, and protect your information
                    when you use our services.
                </p>
                <p className={styled.p}>1. Information We Collect</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>Personal Information</strong>: When you register for an
                    account on ArcGame, we may collect personal information such as your
                    name, email address, date of birth, and payment information. We may
                    also collect information you provide when you communicate with us or
                    participate in surveys or promotions.
                </p>
                <p className={styled.p}>
                    b. <strong className={styled.strong}>Usage Information</strong>: We automatically collect
                    information about your interactions with our services, including your
                    IP address, device information, browser type, and operating system. We
                    may also collect data on your gameplay activity, such as game
                    preferences and achievements.
                </p>
                <p className={styled.p}>
                    c. <strong className={styled.strong}>Cookies and Similar Technologies</strong>: We use cookies
                    and similar technologies to enhance your experience on ArcGame. These
                    technologies help us personalize content, analyze trends, and track
                    user activity. You can manage your cookie preferences through your
                    browser settings.
                </p>
                <p className={styled.p}>2. How We Use Your Information</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>Providing Services</strong>: We use your information to
                    operate, maintain, and improve ArcGame. This includes facilitating
                    gameplay, managing accounts, processing payments, and providing
                    customer support.
                </p>
                <p className={styled.p}>
                    b. <strong className={styled.strong}>Personalization</strong>: We may use your information to
                    personalize your experience on ArcGame, such as recommending games or
                    content based on your interests and preferences.
                </p>
                <p className={styled.p}>
                    c. <strong className={styled.strong}>Communication</strong>: We may use your contact information
                    to communicate with you about your account, service updates,
                    promotions, and other relevant information. You can opt out of
                    receiving promotional communications at any time.
                </p>
                <p className={styled.p}>
                    d. <strong className={styled.strong}>Analytics</strong>: We analyze usage data to better
                    understand how our services are used and to improve user experience,
                    security, and performance.
                </p>
                <p className={styled.p}>3. Sharing Your Information</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>Third-Party Service Providers</strong>: We may share your
                    information with third-party service providers who help us operate,
                    maintain, and improve ArcGame. These providers are contractually
                    obligated to protect your information and only use it for specified
                    purposes.
                </p>
                <p className={styled.p}>
                    b. <strong className={styled.strong}>Legal Compliance</strong>: We may disclose your information
                    in response to legal requests, such as subpoenas or court orders, or
                    to comply with applicable laws and regulations.
                </p>
                <p className={styled.p}>
                    c. <strong className={styled.strong}>Business Transfers</strong>: In the event of a merger,
                    acquisition, or sale of assets, your information may be transferred as
                    part of the transaction. We will notify you of any changes to
                    ownership or control of your information.
                </p>
                <p className={styled.p}>4. Data Security</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>Security Measures</strong>: We employ technical and
                    organizational measures to protect your information from unauthorized
                    access, disclosure, alteration, or destruction. However, no method of
                    transmission over the internet or electronic storage is 100% secure,
                    and we cannot guarantee absolute security.
                </p>
                <p className={styled.p}>
                    b. <strong className={styled.strong}>Account Security</strong>: You are responsible for
                    maintaining the security of your ArcGame account, including choosing a
                    strong password and keeping it confidential. If you believe your
                    account has been compromised, please contact us immediately.
                </p>
                <p className={styled.p}>5. Children&apos;s Privacy</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>Age Restrictions</strong>: ArcGame is not intended for
                    children under the age of 13. If you are under 13, please do not use
                    ArcGame or provide any personal information. If we become aware that
                    we have collected personal information from a child under 13 without
                    parental consent, we will take steps to delete that information.
                </p>
                <p className={styled.p}>6. Your Choices</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>Account Information</strong>: You can access, update, or
                    delete your account information by logging into your ArcGame account
                    settings. If you wish to delete your account entirely, please contact
                    us.
                </p>
                <p className={styled.p}>
                    b. <strong className={styled.strong}>Cookie Preferences</strong>: You can manage your cookie
                    preferences through your browser settings. Please note that disabling
                    cookies may affect your experience on ArcGame.
                </p>
                <p className={styled.p}>7. Changes to this Privacy Policy</p>
                <p className={styled.p}>
                    a. <strong className={styled.strong}>Updates</strong>: We may update this Privacy Policy from
                    time to time to reflect changes in our practices or legal
                    requirements. We will notify you of any material changes by posting
                    the updated policy on ArcGame or by other means.
                </p>
                <p className={styled.p}>
                    b. <strong className={styled.strong}>Your Continued Use</strong>: By continuing to use ArcGame
                    after the effective date of any changes to this Privacy Policy, you
                    agree to the updated terms.
                </p>
                <p className={styled.p}>8. Contact Us</p>
                <p className={styled.p}>
                    If you have any questions or concerns about this Privacy Policy or our
                    privacy practices, please contact us at{" "}
                    <a href="mailto:contact@arcgame.com" className={styled.a}>contact@arcgame.com</a>.
                </p>
                <p className={styled.p}>
                    Thank you for using ArcGame. We are committed to protecting your
                    privacy and providing you with a safe and enjoyable gaming experience.
                </p>
                <p className={styled.p}>
                    Revision Date:{" "}
                    {new Date(2023, 10, 26).toLocaleString("default", { month: "long" })}{" "}
                    {new Date(2023, 10, 26).toLocaleString("default", { day: "numeric" })},{" "}
                    {new Date(2023, 10, 26).toLocaleString("default", { year: "numeric" })}
                </p>
            </main>
            <Footer />
        </>
    );
}
