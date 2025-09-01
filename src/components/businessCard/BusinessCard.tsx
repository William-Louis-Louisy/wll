"use client";

import { CaretRight } from "@phosphor-icons/react";
import styles from "../../styles/BusinessCard.module.css";
import React, { useState, useRef, useEffect, ReactNode } from "react";

export interface FlipCardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  filterColor?: string;
  customPerspective?: string;
  label?: string;
}

export default function BusinessCard({
  frontContent,
  backContent,
  filterColor,
  customPerspective,
  label,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLSpanElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);
  const backRef = useRef<HTMLSpanElement>(null);

  // Calcule la transformation en fonction de la position de la souris
  const calculateAngle = (e: globalThis.MouseEvent): void => {
    const card = cardRef.current;
    const front = frontRef.current;
    const back = backRef.current;
    const glare = glareRef.current;
    if (!card || !front || !back || !glare) return;

    const dropShadowColor = filterColor ?? "rgba(0, 0, 0, 0.3)";
    card.classList.add(styles.animated);

    const rect = front.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    const rotateY = (x - halfWidth) / 6;
    const rotateX = (halfHeight - y) / 14;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgb(199 198 243), transparent)`;

    const perspective = customPerspective ?? `${halfWidth * 6}px`;
    card.style.perspective = perspective;
    front.style.perspective = perspective;

    front.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.04)`;
    back.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.04) translateZ(-4px)`;

    const shadowX = (x - halfWidth) / 3;
    const shadowY = (y - halfHeight) / 6;
    front.style.filter = `drop-shadow(${-shadowX}px ${-shadowY}px 15px ${dropShadowColor})`;
  };

  // Remise à zéro des styles quand la souris quitte la carte
  const handleMouseLeave = (): void => {
    const card = cardRef.current;
    const front = frontRef.current;
    const back = backRef.current;
    if (!card || !front || !back) return;

    const dropShadowColor = filterColor ?? "rgba(0, 0, 0, 0.3)";
    card.classList.remove(styles.animated);
    front.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    back.style.transform =
      "rotateY(0deg) rotateX(0deg) scale(1.01) translateZ(-4px)";
    front.style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Tilt uniquement si pointeur fin + hover (desktop)
    const canTilt =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Bonus accessibilité : respecte l’OS si "réduire les animations"
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canTilt || reduceMotion) {
      // État neutre sans tilt
      handleMouseLeave();
      return;
    }

    const onEnter = (e: MouseEvent): void => calculateAngle(e);
    const onMove = (e: MouseEvent): void => calculateAngle(e);
    const onLeave = (): void => handleMouseLeave();

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [filterColor, customPerspective]);

  return (
    <div className="size-full min-h-112 flex flex-col justify-center items-center">
      {" "}
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
        ref={cardRef}
      >
        {/* Face arrière */}
        <span className={styles.innerCardBackface} ref={backRef}>
          <span className={styles.backContent}>
            {backContent}
            <span
              className={styles.unflip}
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              {label} <CaretRight size={12} />
            </span>
          </span>
        </span>

        {/* Face avant */}
        <span className={styles.innerCard} ref={frontRef}>
          <span
            className={styles.flip}
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(true);
            }}
          >
            {label} <CaretRight size={12} />
          </span>
          <span className={styles.glare} ref={glareRef} />
          <span className={styles.frontContent}>{frontContent}</span>
        </span>
      </div>
    </div>
  );
}
