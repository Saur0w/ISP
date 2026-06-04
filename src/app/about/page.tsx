"use client";

import styles from "./style.module.scss";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function About() {
    const pageRef = useRef<HTMLElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const subHeroRef = useRef<HTMLParagraphElement>(null);
    const narrativeRef = useRef<HTMLDivElement>(null);
    const bioTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const titleTargets = [heroTitleRef.current, subHeroRef.current].filter(Boolean) as HTMLElement[];
        const bioTargets = bioTextRef.current ? (Array.from(bioTextRef.current.children) as HTMLElement[]) : [];

        if (titleTargets.length === 0) return;

        const ctx = gsap.context(() => {
            const introChild = new SplitText(titleTargets, {
                type: "lines",
                linesClass: "split-child"
            });
            new SplitText(titleTargets, {
                type: "lines",
                linesClass: "split-parent"
            });

            let bioChild: SplitText | null = null;
            if (bioTargets.length > 0) {
                bioChild = new SplitText(bioTargets, {
                    type: "lines",
                    linesClass: "split-child"
                });
                new SplitText(bioTargets, {
                    type: "lines",
                    linesClass: "split-parent"
                });
            }

            const tl = gsap.timeline();

            tl.from(introChild.lines, {
                duration: 1.4,
                yPercent: 110,
                ease: "expo.out",
                stagger: 0.04
            });

            if (bioChild) {
                gsap.from(bioChild.lines, {
                    scrollTrigger: {
                        trigger: narrativeRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none"
                    },
                    duration: 1.2,
                    yPercent: 110,
                    ease: "power4.out",
                    stagger: 0.02
                });
            }

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className={styles.aboutPage} ref={pageRef}>
            <section className={styles.heroSection}>
                <div className={styles.wrapper}>
                    <span className={styles.preTitle}>{"The Person Behind The Code"}</span>
                    <h1 ref={heroTitleRef} className={styles.giantTitle}>
                        {"Designing systems,"}<br />{"animating ideas."}
                    </h1>

                    <p ref={subHeroRef} className={styles.subHero}>
                        {"Isha is a digital creator modeling clean frameworks and interaction layers from the mountains to the web ecosystem."}
                    </p>
                </div>
            </section>
            <section className={styles.narrativeSection} ref={narrativeRef}>
                <div className={`${styles.wrapper} ${styles.grid}`}>
                    <div className={styles.metaColumn}>
                        <div className={styles.metaBlock}>
                            <span className={styles.metaLabel}>{"Origin"}</span>
                            <p className={styles.metaValue}>{"Uttarakhand, India"}</p>
                        </div>
                        <div className={styles.metaBlock}>
                            <span className={styles.metaLabel}>{"Focus Area"}</span>
                            <p className={styles.metaValue}>{"Frontend Dev, UI/UX, Motion Architecture"}</p>
                        </div>
                    </div>

                    <div className={styles.storyColumn} ref={bioTextRef}>
                        <h2 className={styles.storyHeading}>
                            {"Merging strict engineering logic with fluid creative aesthetics."}
                        </h2>
                        <p className={styles.storyParagraph}>
                            {"My approach to frontend development extends beyond standard element construction. I look at web canvases as live environments where layout grids, spatial balance, and performance optimization must function as a synchronized machine."}
                        </p>
                        <p className={styles.storyParagraph}>
                            {"As a frontend engineer, digital designer, and web animator, I bridge the space between intricate creative visions and functional, high-performance codebases. Whether managing layout assets or configuring complex timeline interactions, my goal is to deliver responsive, seamless digital experiences."}
                        </p>
                    </div>

                </div>
            </section>
        </main>
    );
}