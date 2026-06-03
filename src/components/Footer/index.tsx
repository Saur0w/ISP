"use client";

import styles from "./style.module.scss";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {/* Top Row: Big Call to Action */}
                <div className={styles.ctaRow}>
                    <span className={styles.subLabel}>Have an idea?</span>
                    <h2 className={styles.ctaTitle}>
                        <Link href="mailto:isha@example.com" className={styles.ctaLink}>
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
                            <Link href="/work">Work</Link>
                        </nav>
                    </div>
                    <div className={styles.dirColumn}>
                        <span className={styles.columnTitle}>Connect</span>
                        <nav className={styles.footerNav}>
                            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
                            <Link href="https://behance.net" target="_blank" rel="noopener noreferrer">Behance</Link>
                            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</Link>
                        </nav>
                    </div>

                    <div className={`${styles.dirColumn} ${styles.alignRight}`}>
                        <span className={styles.columnTitle}>Location</span>
                        <p className={styles.infoText}>Uttarakhand, India</p>
                        <p className={styles.infoTextStatus}>● Available for freelance</p>
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