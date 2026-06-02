"use client";

import styles from "./style.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const headline = "ISHA";

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".char", {
            duration: 1.2,
            y: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "power4.out",
            rotationZ: 10,
        })
            .from(subtextRef.current, {
                duration: 1,
                y: 30,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.8");

    }, { scope: landingRef });

    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.content}>
                <h1
                    ref={textRef}
                    className={styles.title}
                    aria-label={`Isha, ${headline}`}
                >
                    {headline.split('').map((char, charIndex) => (
                        <span key={charIndex} className="char" style={{ display: 'inline-block' }} aria-hidden="true">
                            {char}
                        </span>
                    ))}
                </h1>

                <p ref={subtextRef} className={styles.subtitle}>
                    Crafting immersive digital experiences through code and motion.
                    Based in India, working worldwide.
                </p>
            </div>
        </section>
    )
}