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
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const textTargets = [titleRef.current, descRef.current].filter(Boolean) as HTMLElement[];
        if (textTargets.length === 0) return;

        const ctx = gsap.context(() => {
            // --- THE AWWWARDS MASK REVEAL ---
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
                    toggleActions: "play none none none",
                }
            });

            // Animate headings smoothly up out of their hidden overflow parents
            tl.from(childSplit.lines, {
                duration: 1.3,
                yPercent: 110,
                ease: "expo.out",
                stagger: 0.04
            });

            // Stagger reveal the skills/tools structure cleanly
            if (gridRef.current) {
                const categories = gridRef.current.children;
                tl.from(categories, {
                    duration: 1,
                    opacity: 0,
                    y: 30,
                    stagger: 0.08,
                    ease: "power3.out"
                }, "-=0.7");
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Clean, high-end portfolio categorization arrays
    const technicalToolkit = [
        {
            category: "Core Frontend",
            skills: ["Next.js", "React Architecture", "TypeScript", "JavaScript (ES6+)", "HTML5 & CSS3 Architecture"]
        },
        {
            category: "Motion & Creative",
            skills: ["GSAP (GreenSock)", "Advanced Motion Plugins", "WebGL & Shaders", "CSS Keyframe Logic"]
        },
        {
            category: "Design & Systems",
            skills: ["Figma Design Systems", "UI/UX Wireframing", "Layout & Composition", "Git Workflow"]
        }
    ];

    return (
        <section className={styles.about} ref={containerRef}>
            <div className={styles.container}>

                {/* Masked Main Display Heading */}
                <h2 ref={titleRef} className={styles.title} aria-label="Tools I'm fluent in.">
                    Tools <br /> I&#39;m fluent in.
                </h2>

                {/* Sub-narrative Block */}
                <p ref={descRef} className={styles.description}>
                    <strong>HTML, CSS, JavaScript, React, and Next.js</strong> to build
                    clean, performant, and scalable web applications. Currently expanding
                    my creative horizons by diving deep into <strong>TypeScript, GSAP, and advanced
                    motion plugins</strong> to bridge the gap between development and interaction design.
                </p>

                {/* Premium Asymmetric Skills Directory */}
                <div ref={gridRef} className={styles.toolsGrid}>
                    {technicalToolkit.map((item, index) => (
                        <div key={index} className={styles.gridColumn}>
                            <h3 className={styles.columnTitle}>{item.category}</h3>
                            <ul className={styles.skillsList}>
                                {item.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className={styles.skillItem}>
                                        <span className={styles.bulletDot} />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}