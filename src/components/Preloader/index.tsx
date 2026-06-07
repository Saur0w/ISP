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
                gsap.set(wordElements, { yPercent: 100, opacity: 0 });

                words.forEach((_, index) => {
                    const currentWord = wordElements[index];

                    tl.to(currentWord, {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.14,
                        ease: "power4.out"
                    });

                    if (index < words.length - 1) {
                        tl.to(currentWord, {
                            yPercent: -100,
                            opacity: 0,
                            duration: 0.14,
                            ease: "power4.in",
                            delay: 0.12
                        });
                    } else {
                        tl.to(currentWord, { delay: 0.2 });
                    }
                });
            }

            if (counterRef.current) {
                tl.to(counterRef.current, {
                    innerText: "100",
                    duration: words.length * 0.4,
                    snap: { innerText: 1 },
                    ease: "power2.out"
                }, 0);
            }

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
            <div className={styles.topMeta}>
                <span className={styles.dot} />
                <span>{"ARCHITECTURE / SYSTEM"}</span>
            </div>

            <div className={styles.wordWrapper}>
                <div ref={listRef} className={styles.wordList}>
                    {words.map((word, idx) => (
                        <h2 key={idx} className={styles.wordItem}>
                            {word}
                        </h2>
                    ))}
                </div>
            </div>

            <div className={styles.counterFrame}>
                <span ref={counterRef} className={styles.counterNumber}>{"00"}</span>
                <span className={styles.counterPercent}>{"%"}</span>
            </div>
        </div>
    );
}