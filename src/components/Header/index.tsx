"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(headerRef.current, {
            y: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.1
        });
    }, { scope: headerRef });

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.logo}>
                <Link href="/">@Isha.</Link>
            </div>
            <nav className={styles.nav}>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </nav>
            <div className={styles.cta}>
                <button><Link href="/contact">Let&#39;s Talk</Link></button>
            </div>
        </header>
    )
}