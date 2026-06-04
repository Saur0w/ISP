"use client";

import styles from "./style.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const words = ["Hello", "Namaste", "Bonjour", "Hola", "Welcome"];

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [done, setDone] = useState(false);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                onComplete: () => setDone(true),
            });

            const wordElements = listRef.current?.children;
            if (wordElements) {
                // Initialize all words out of view below the mask container frame
                gsap.set(wordElements, { yPercent: 100, opacity: 0 });

                words.forEach((_, index) => {
                    const currentWord = wordElements[index];

                    // Fast, sharp slide up into the mask window
                    tl.to(currentWord, {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.14,
                        ease: "power4.out"
                    });

                    // Sharp exit upward (except for the last word, which exits with the panel)
                    if (index < words.length - 1) {
                        tl.to(currentWord, {
                            yPercent: -100,
                            opacity: 0,
                            duration: 0.14,
                            ease: "power4.in",
                            delay: 0.12 // Short hold time for readability
                        });
                    } else {
                        // Let the final word linger briefly before the screen wipe
                        tl.to(currentWord, { delay: 0.2 });
                    }
                });
            }

            // Rapidly tick up the digital loader sequence to 100%
            if (counterRef.current) {
                tl.to(counterRef.current, {
                    innerText: "100",
                    duration: words.length * 0.4, // Automatically scaled to match the word sequence
                    snap: { innerText: 1 },
                    ease: "power2.out"
                }, 0);
            }

            // High-end, heavy exponential slide-out reveal
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 1.1,
                ease: "expo.inOut",
            }, "-=0.05");

        },
        { scope: containerRef }
    );

    if (done) return null;

    return (
        <div className={styles.preloader} ref={containerRef}>
            {/* Top Minimal Layout Metadata */}
            <div className={styles.topMeta}>
                <span className={styles.dot} />
                <span>{"ARCHITECTURE / SYSTEM"}</span>
            </div>

            {/* Hardware-Accelerated Typography Mask Frame */}
            <div className={styles.wordWrapper}>
                <div ref={listRef} className={styles.wordList}>
                    {words.map((word, idx) => (
                        <h2 key={idx} className={styles.wordItem}>
                            {word}
                        </h2>
                    ))}
                </div>
            </div>

            {/* Asymmetrical Corner Percentage Ticker */}
            <div className={styles.counterFrame}>
                <span ref={counterRef} className={styles.counterNumber}>{"00"}</span>
                <span className={styles.counterPercent}>{"%"}</span>
            </div>
        </div>
    );
}