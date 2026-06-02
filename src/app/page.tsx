"use client";

import styles from "./page.module.css";
import Lenis from "lenis";
import { useEffect } from "react";
import Landing from "@/components/Landing";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
    return (
        <div className={styles.page}>
            <Header />
            <Landing />
            <Intro />
            <Footer />
        </div>
  );
}
