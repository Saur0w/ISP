"use client";

import { useRef } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Header from "@/components/Header";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const splitHeading = new SplitText(".split-target", { type: "chars, words" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%", 
                toggleActions: "play none none reverse"
            }
        });
        tl.from(splitHeading.chars, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "power4.out",
        })
        .from(".fade-up", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        }, "-=0.6");

    }, { scope: containerRef });

    return (
        <>
            <main className={styles.contact} ref={containerRef}>
            <div className={styles.leftCol}>
                <h1 className="split-target">Let&#39;s collaborate</h1>
                
                <Link href="mailto:inegi9336@gmail.com" className={`${styles.email} fade-up`}>
                    inegi9336@gmail.com
                </Link>

                <div className={`${styles.footerDetails} fade-up`}>
                    <div className={styles.socials}>
                        <h4>{"Connect"}</h4>
                        <ul>
                            <li><Link href="https://github.com/Ishacodeuser">{"GitHub"}</Link></li>
                            <li><Link href="https://x.com/dev_ezha">{"X"}</Link></li>
                        </ul>
                    </div>
                    <div className={styles.location}>
                        <h4>Chamoli, Uttarakhand</h4>
                    </div>
                </div>
            </div>

            <div className={`${styles.rightCol} fade-up`}>
                <h2>Say hello</h2>
                
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">NAME</label>
                        <input type="text" id="name" placeholder="Your name" />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="subject">SUBJECT</label>
                        <input type="text" id="subject" placeholder="Choose subject" />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="company">COMPANY</label>
                        <input type="text" id="company" placeholder="Your company" />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">EMAIL</label>
                        <input type="email" id="email" placeholder="Email address" />
                    </div>
                    
                    <div className={styles.inputGroupFull}>
                        <label htmlFor="message">MESSAGE</label>
                        <textarea id="message" placeholder="Start typing here" rows={1}></textarea>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Submit <span className={styles.arrow}>&rarr;</span>
                    </button>
                </form>
            </div>
        </main>
        </>
    );
}