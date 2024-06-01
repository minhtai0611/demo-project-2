import styled from "./Recruit.module.css";
import { lazy } from "react";

const Header = lazy(() => import("../HeaderComponent/Header"));
const Footer = lazy(() => import("../FooterComponent/Footer"));
export default function Recruit() {
    return (
        <>
            {/* <Header /> */}
            <main className={styled["nokora-bold"] + " " + styled.recruit}>
                <video
                    playsInline
                    loop
                    muted
                    autoPlay
                    // controls
                    // controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
                    disablePictureInPicture
                    disableRemotePlayback
                    preload="metadata"
                    poster="https://cdn.cloudflare.steamstatic.com/valvesoftware/images/videos/hero_01_fullsize.jpg"
                    className={styled.recruitVideo}
                >
                    <source src="https://cdn.cloudflare.steamstatic.com/valvesoftware/images/videos/hero_01_small.mp4" type="video/mp4" />
                    <source src="https://cdn.cloudflare.steamstatic.com/valvesoftware/images/videos/hero_01_small.webm" type="video/webm" />
                    Sorry, your browser doesn&apos;t support videos.
                </video>
                <div className={styled.recruitContent}>
                    <p className={styled.recruitTitle}>Join us in revolutionizing the way you play, share, and interact in the digital gaming universe.</p>
                    <p className={styled.recruitP}>
                        Are you passionate about gaming and innovation? ArcGame, a leader in online distribution, rights management, multiplayer gaming, and social communication, is looking for talented individuals to help us shape the future of gaming. Apply now to become part of our dynamic team! We offer exciting career opportunities in various fields here:
                    </p>
                    <div className={styled.jobDiv}>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Art
                                </summary>
                                <span className={styled.jobUnit}>
                                    3D Character Artist
                                </span>
                                <span className={styled.jobUnit}>
                                    Animator
                                </span>
                                <span className={styled.jobUnit}>
                                    Effects Artist
                                </span>
                                <span className={styled.jobUnit}>
                                    3D Environment Artist
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Audio
                                </summary>
                                <span className={styled.jobUnit}>
                                    Sound Designer
                                </span>
                                <span className={styled.jobUnit}>
                                    Audio Software Engineer
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Business Development
                                </summary>
                                <span className={styled.jobUnit}>
                                    Business Development ArcGame Team
                                </span>
                                <span className={styled.jobUnit}>
                                    Partner Technical Account Manager
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Data Science
                                </summary>
                                <span className={styled.jobUnit}>
                                    Economist
                                </span>
                                <span className={styled.jobUnit}>
                                    Research/Experimental Psychologist
                                </span>
                                <span className={styled.jobUnit}>
                                    Statistician / Data Scientist
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Finance
                                </summary>
                                <span className={styled.jobUnit}>
                                    Accounting Professional
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Game Design
                                </summary>
                                <span className={styled.jobUnit}>
                                    Level Designer
                                </span>
                                <span className={styled.jobUnit}>
                                    Research/Experimental Psychologist
                                </span>
                                <span className={styled.jobUnit}>
                                    Sound Designer
                                </span>
                                <span className={styled.jobUnit}>
                                    Game Development Software Engineer
                                </span>
                                <span className={styled.jobUnit}>
                                    Game Designer
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Hardware
                                </summary>
                                <span className={styled.jobUnit}>
                                    Electrical Engineer
                                </span>
                                <span className={styled.jobUnit}>
                                    Industrial Designer
                                </span>
                                <span className={styled.jobUnit}>
                                    Software Engineer for HW
                                </span>
                                <span className={styled.jobUnit}>
                                    Mechanical Engineer
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Product Design
                                </summary>
                                <span className={styled.jobUnit}>
                                    Industrial Designer
                                </span>
                                <span className={styled.jobUnit}>
                                    Visual & User Experience Designer
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Software Engineering
                                </summary>
                                <span className={styled.jobUnit}>
                                    Software Engineer
                                </span>
                                <span className={styled.jobUnit}>
                                    Database Administrator
                                </span>
                                <span className={styled.jobUnit}>
                                    Partner Technical Account Manager
                                </span>
                                <span className={styled.jobUnit}>
                                    Software Engineer for HW
                                </span>
                                <span className={styled.jobUnit}>
                                    Game Development Software Engineer
                                </span>
                                <span className={styled.jobUnit}>
                                    Computer Vision Software Engineer
                                </span>
                                <span className={styled.jobUnit}>
                                    Audio Software Engineer
                                </span>
                                <span className={styled.jobUnit}>
                                    Systems Engineer
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Technical Infrastructure
                                </summary>
                                <span className={styled.jobUnit}>
                                    Database Administrator
                                </span>
                            </details>
                        </span>
                        <span className={styled.jobSpan}>
                            <details className={styled.jobDetail}>
                                <summary className={styled.jobSummary}>
                                    Did we miss something?
                                </summary>
                                <span className={styled.jobUnit}>
                                    Even if your specialty isn&apos;t listed, but you have years of professional experience, exceptional talent, and skills that can enhance our products and customer experiences, we encourage you to apply. We seek seasoned professionals who can bring fresh knowledge and expertise to ArcGame.
                                    <br />
                                    <br />
                                    <a href="#" className={styled.jobLink}>APPLY NOW</a>
                                </span>
                            </details>
                        </span>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </>
    )
}