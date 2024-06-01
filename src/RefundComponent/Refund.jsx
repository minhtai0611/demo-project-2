import styled from "./Refund.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Refund() {
    return (
        <>
            <Header />
            <main className={styled["nokora-bold"] + " " + styled.refund}>
                <p className={styled.refundTitle}>Refund Policy</p>
                <p className={styled.refundP}>Welcome to ArcGame, an internet-based online distribution, rights management, multiplayer video game, and social communication service. We strive to provide our users with the best possible gaming experience. However, we understand that there may be instances where a refund is necessary. This Refund Policy outlines the terms and conditions under which refunds are processed for purchases made through ArcGame.</p>
                <p className={styled.refundMainP}>1. General Refund Policy</p>
                <p className={styled.refundP}>ArcGame offers refunds for eligible purchases within certain timeframes and conditions as specified below. Refund requests must be submitted within the applicable refund period, and all refund decisions are at the sole discretion of ArcGame. Our general refund policy is designed to be fair to both our customers and ArcGame.</p>
                <p className={styled.refundMainP}>2. Eligibility for Refunds</p>
                <p className={styled.refundP}>a. <strong className={styled.refundStrong}>Game Purchases</strong>: Refunds for games purchased through ArcGame can be requested within 14 days of the purchase date, provided that the game has been played for less than 2 hours. Refunds will not be granted for games that have been played for more than 2 hours or if the refund request is made after 14 days from the purchase date.</p>
                <p className={styled.refundP}>b. <strong className={styled.refundStrong}>In-Game Purchases</strong>: Refunds for in-game purchases, including virtual currency, items, and other digital content, can be requested within 48 hours of the purchase, provided that the content has not been used, consumed, modified, or transferred. Refunds will not be granted for in-game purchases if any of these conditions are not met.</p>
                <p className={styled.refundP}>c. <strong className={styled.refundStrong}>Subscriptions</strong>: Refunds for subscription services, including but not limited to ArcGame Premium, can be requested within 7 days of the initial subscription purchase, provided that the subscription benefits have not been used. Refunds will not be granted for renewal payments of subscriptions. To avoid future charges, please cancel your subscription before the next billing cycle.</p>
                <p className={styled.refundP}>d. <strong className={styled.refundStrong}>Pre-Orders</strong>: Refunds for pre-ordered games can be requested at any time before the game is released. Once the game is released, the standard refund policy for game purchases applies.</p>
                <p className={styled.refundMainP}>3. How to Request a Refund</p>
                <p className={styled.refundP}>To request a refund, please follow these steps:</p>
                <p className={styled.refundP}>a. <strong className={styled.refundStrong}>Log In</strong>: Log in to your ArcGame account.</p>
                <p className={styled.refundP}>b. <strong className={styled.refundStrong}>Access Purchase History</strong>: Navigate to your purchase history in your account settings.</p>
                <p className={styled.refundP}>c. <strong className={styled.refundStrong}>Select the Purchase</strong>: Find the purchase for which you want to request a refund and select it.</p>
                <p className={styled.refundP}>d. <strong className={styled.refundStrong}>Submit Request</strong>: Click on the “Request a Refund” button and provide the required information, including the reason for the refund request.</p>
                <p className={styled.refundP}>e. <strong className={styled.refundStrong}>Confirmation</strong>: You will receive an email confirming that your refund request has been received. Our support team will review your request and notify you of the decision via email.</p>
                <p className={styled.refundMainP}>4. Refund Process</p>
                <p className={styled.refundP}>Refunds are typically processed within 7-10 business days from the date of approval. Refunds will be issued to the original payment method used for the purchase. If the original payment method is no longer available, please contact our support team for assistance. Please note that processing times may vary depending on your financial institution.</p>
                <p className={styled.refundMainP}>5. Non-Refundable Items</p>
                <p className={styled.refundP}>The following items are not eligible for refunds:</p>
                <p className={styled.refundP}>a. <strong className={styled.refundStrong}>Gift Cards</strong>: ArcGame gift cards and prepaid cards are non-refundable and cannot be exchanged for cash or other products.</p>
                <p className={styled.refundP}>b. <strong className={styled.refundStrong}>Bundled Products</strong>: Products purchased as part of a bundle or promotion may only be refunded if all items within the bundle are eligible for a refund. Partial refunds for bundled products are not available.</p>
                <p className={styled.refundP}>c. <strong className={styled.refundStrong}>Third-Party Purchases</strong>: Purchases made through third-party platforms or retailers are subject to the refund policies of those platforms or retailers. ArcGame is not responsible for refunding purchases made outside of our platform.</p>
                <p className={styled.refundMainP}>6. Exceptional Circumstances</p>
                <p className={styled.refundP}>In certain exceptional circumstances, ArcGame may, at its sole discretion, offer refunds beyond the standard policy. These circumstances may include but are not limited to:</p>
                <p className={styled.refundP}>a. <strong className={styled.refundStrong}>Technical Issues</strong>: If a game or service is found to have significant technical issues that prevent it from being played or used as intended, and these issues cannot be resolved, a refund may be granted.</p>
                <p className={styled.refundP}>b. <strong className={styled.refundStrong}>Unauthorized Purchases</strong>: If you believe that a purchase was made fraudulently or without your authorization, please contact our support team immediately. Refunds for unauthorized purchases will be considered on a case-by-case basis.</p>
                <p className={styled.refundP}>c. <strong className={styled.refundStrong}>Customer Satisfaction</strong>: While we strive to ensure customer satisfaction, we understand that there may be unique situations that warrant special consideration. Please contact our support team to discuss any concerns you may have.</p>
                <p className={styled.refundMainP}>7. Changes to this Refund Policy</p>
                <p className={styled.refundP}>ArcGame reserves the right to modify or update this Refund Policy at any time. Any changes to the policy will be posted on our website and will take effect immediately upon posting. It is your responsibility to review this policy periodically for any updates or changes. By continuing to use ArcGame’s services, you agree to the terms of the updated Refund Policy.</p>
                <p className={styled.refundMainP}>8. Contact Us</p>
                <p className={styled.refundP}>If you have any questions or concerns about this Refund Policy or if you need assistance with a refund request, please contact our support team at: <a href="mailto:refund@arcgame.com" className={styled.refundLink}>refund@arcgame.com</a></p>
                <p className={styled.refundP}>We are committed to providing you with a positive gaming experience and appreciate your understanding of our refund policies. Thank you for choosing ArcGame.</p>
                <p className={styled.refundP}>
                    Revision Date:{" "}
                    {new Date(2023, 4, 23).toLocaleString("default", { month: "long" })}{" "}
                    {new Date(2023, 4, 23).toLocaleString("default", { day: "numeric" })},{" "}
                    {new Date(2023, 4, 23).toLocaleString("default", { year: "numeric" })}
                </p>
            </main>
            <Footer />
        </>
    )
}