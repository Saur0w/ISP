"use client";

import styles from "./style.module.scss";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.ctaRow}>
                    <span className={styles.subLabel}>Have an idea?</span>
                    <h2 className={styles.ctaTitle}>
                        <Link href="mailto:inegi9336@gmail.com" className={styles.ctaLink}>
                            Let&apos;s work together
                        </Link>
                    </h2>
                </div>

                <div className={styles.directoryGrid}>
                    <div className={styles.dirColumn}>
                        <span className={styles.columnTitle}>Navigation</span>
                        <nav className={styles.footerNav}>
                            <Link href="/">Home</Link>
                            <Link href="/about">About</Link>
                            <Link href="/contact">Contact</Link>
                        </nav>
                    </div>
                    <div className={styles.dirColumn}>
                        <span className={styles.columnTitle}>Connect</span>
                        <nav className={styles.footerNav}>
                            <Link href="https://github.com/Ishacodeuser" target="_blank" rel="noopener noreferrer">GitHub</Link>
                            <Link href="https://x.com/dev_ezha" target="_blank" rel="noopener noreferrer">X</Link>
                        </nav>
                    </div>

                    <div className={`${styles.dirColumn} ${styles.alignRight}`}>
                        <span className={styles.columnTitle}>Location</span>
                        <p className={styles.infoText}>Uttarakhand, India</p>
                    </div>
                </div>

                <div className={styles.copyrightRow}>
                    <span>&copy; {currentYear} Isha. All rights reserved.</span>
                    <span>Designed & Developed by Isha</span>
                </div>
            </div>
        </footer>
    );
}