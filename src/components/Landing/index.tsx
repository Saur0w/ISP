"use client";

import styles from "./style.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    return (
        <section className={styles.landing} ref={landingRef}>

        </section>
    )
}

