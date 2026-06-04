"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Intro() {
    const sectionRef = useRef<HTMLElement>(null);
    const graphicRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const leadRef = useRef<HTMLParagraphElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const textTargets = [
                titleRef.current,
                leadRef.current,
                bodyRef.current,
            ].filter(Boolean) as HTMLElement[];

            if (textTargets.length === 0) return;
            const run = () => {
                const childSplit = new SplitText(textTargets, {
                    type: "lines",
                    linesClass: "split-child",
                });
                const parentSplit = new SplitText(textTargets, {
                    type: "lines",
                    linesClass: "split-parent",
                });

                gsap.set(childSplit.lines, { yPercent: 100 });
                gsap.set(graphicRef.current, {
                    clipPath: "inset(100% 0% 0% 0%)",
                    opacity: 0,
                });
                gsap.set(imageRef.current, { scale: 1.25 });
                gsap.set(contactRef.current, { opacity: 0, y: 20 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse",
                    },
                });

                tl.to(graphicRef.current, {
                    duration: 1.4,
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 1,
                    ease: "expo.out",
                })
                    .to(
                        imageRef.current,
                        {
                            duration: 1.6,
                            scale: 1,
                            ease: "expo.out",
                        },
                        "<"
                    )
                    .to(
                        childSplit.lines,
                        {
                            duration: 1.1,
                            yPercent: 0,
                            ease: "power4.out",
                            stagger: 0.06,
                        },
                        "-=1"
                    )
                    .to(
                        contactRef.current,
                        {
                            duration: 1,
                            opacity: 1,
                            y: 0,
                            ease: "power2.out",
                        },
                        "-=0.6"
                    );

                return () => {
                    tl.scrollTrigger?.kill();
                    tl.kill();
                    childSplit.revert();
                    parentSplit.revert();
                };
            };

            let cleanup: (() => void) | void;
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    cleanup = run();
                });
            } else {
                cleanup = run();
            }

            return () => {
                if (cleanup) cleanup();
            };
        },
        { scope: sectionRef }
    );

    return (
        <section className={styles.intro} ref={sectionRef}>
            <div className={styles.mainGrid}>
                <div className={styles.graphicContainer} ref={graphicRef}>
                    <div className={styles.graphicFrame}>
                        <div className={styles.imageWrap} ref={imageRef}>
                            <Image
                                src="/images/isha.png"
                                alt="img"
                                priority
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.textContainer}>
                    <h2 ref={titleRef} className={styles.heroTitle}>
                        Hello!<br />I&apos;m Isha
                    </h2>

                    <p ref={leadRef} className={styles.leadText}>
                        A creative developer and animator exploring the intersection of clean structural code, motion logic, and interactive aesthetics.
                    </p>

                    <p ref={bodyRef} className={styles.bodyText}>
                        I focus on building memorable front-end solutions that convert static layouts into lively digital realities. To me, development is far more than styling boxes&mdash;it&apos;s a tool utilized to narrate digital paths, establish brand presence, and craft perfect synchronizations between user behaviors and interface responsiveness.
                    </p>
                </div>
            </div>

            <div className={styles.metadataRow} ref={contactRef}>
                <div className={styles.metaItem}>
                    <Link href="mailto:inegi9336@gmail.com">inegi9336@gmail.com</Link>
                </div>
                <div className={styles.metaItem}>
                    <span>India</span>
                </div>
            </div>
        </section>
    );
}