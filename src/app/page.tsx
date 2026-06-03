"use client";

import styles from "./page.module.css";
import Lenis from "lenis";
import { useEffect } from "react";
import Landing from "@/components/Landing";
import Intro from "@/components/Intro";
import Services from "@/components/Services";

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
            <Landing />
            <Intro />
            <Services />
        </div>
  );
}
