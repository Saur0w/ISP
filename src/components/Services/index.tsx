"use client";

import styles from "./style.module.scss";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function Services() {
    // FIX 1: Changed HTMLSectionElement to HTMLElement
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const tagsRef = useRef<HTMLDivElement>(null);

    // FIX 2: Replaced useGSAP with a standard useEffect + gsap.context
    // This executes purely post-paint on the client, eliminating the need for state hooks
    useEffect(() => {
        const textTargets = [titleRef.current, descriptionRef.current].filter(Boolean) as HTMLElement[];
        if (textTargets.length === 0) return;

        // Establish an isolated GSAP context for safe cleanup
        const ctx = gsap.context(() => {
            const childSplit = new SplitText(textTargets, {
                type: "lines",
                linesClass: "split-child"
            });

            new SplitText(textTargets, {
                type: "lines",
                linesClass: "split-parent"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });

            tl.from(childSplit.lines, {
                duration: 1.2,
                yPercent: 100,
                ease: "power4.out",
                stagger: 0.05
            });

            if (tagsRef.current) {
                const tags = tagsRef.current.children;
                tl.from(tags, {
                    duration: 1,
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                    ease: "power3.out",
                    stagger: 0.04
                }, "-=0.6");
            }
        }, containerRef);

        // Clean up mutations instantly if the component unmounts
        return () => ctx.revert();
    }, []);

    const capabilities = [
        "Creative Frontend",
        "UI/UX Design",
        "Motion Logic",
        "Interactive Art",
        "WebGL & Shaders",
        "Typography Systems",
        "Brand Systems",
        "Micro-Interactions",
        "Sass Architecture"
    ];

    return (
        <section className={styles.services} ref={containerRef}>
            <div className={styles.contentWrapper}>
                {/* Text is tightly packed to prevent hidden layout whitespace issues */}
                <h2 ref={titleRef} className={styles.title}>
                    What I do?<br />(and love doing)
                </h2>

                <p ref={descriptionRef} className={styles.description}>
                    I build interfaces that move—sometimes complex, sometimes minimal, but always high-performance. I have a deep appreciation for bold typography, fluid animations, structured frameworks, and interactions that break out of basic box modules.
                </p>

                <div ref={tagsRef} className={styles.tagsContainer}>
                    {capabilities.map((skill, index) => (
                        <div key={index} className={styles.tagItem}>
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}