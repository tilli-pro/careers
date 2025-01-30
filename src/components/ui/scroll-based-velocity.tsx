"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface VelocityScrollProps {
  text: string | JSX.Element;
  default_velocity?: number; // keep if you want to do something with speed
  className?: string;
}

interface ParallaxProps {
  children: string | JSX.Element;
  baseVelocity: number;
  className?: string;
}

export function ParallaxText({
  children,
  baseVelocity = 5,
  className,
}: ParallaxProps) {
  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        // Add 2 to give some padding so there's no gap
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  // Decide which animation class to use based on sign of baseVelocity
  // If baseVelocity > 0 => move left, else move right
  const animationClass = baseVelocity >= 0 ? "marquee-left" : "marquee-right";

  // If you want to allow dynamic speeds, you can incorporate an inline style
  // using a CSS variable for controlling duration, e.g.:
  //
  // const marqueeStyle = {
  //   "--marquee-speed": `${Math.abs(baseVelocity)}s`,
  // } as React.CSSProperties;

  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap"
      ref={containerRef}
      // style={marqueeStyle} // optional if using a var for dynamic speeds
    >
      <div className={cn("inline-block", animationClass, className)}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : null}>
            {children}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

export function VelocityScroll({
  text,
  default_velocity = 5,
  className,
}: VelocityScrollProps) {
  return (
    <div className="relative w-full select-none">
      {/* Move left */}
      <ParallaxText baseVelocity={default_velocity} className={className}>
        {text}
      </ParallaxText>
      {/* Move right */}
      {/* <ParallaxText baseVelocity={-default_velocity} className={className}>
        {text}
      </ParallaxText> */}
    </div>
  );
}

function throttle<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

interface MarqueeProps {
  children: React.ReactNode;
  durationSeconds?: number;
  className?: string;
}

export function SeamlessMarquee({
  children,
  durationSeconds = 10,
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [needs, setNeeds] = useState<number>(2); // default to 2 repeats

  useEffect(() => {
    const handleResize = throttle(() => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.scrollWidth;

        let newRepeats = 2;
        // Ensure repeated text is at least 2× container width
        if (textWidth < containerWidth) {
          newRepeats = Math.ceil((2 * containerWidth) / textWidth);
        }
        setNeeds(newRepeats);
      }
    }, 200); // adjust delay as needed (200ms here)

    // Call it once on mount
    handleResize();

    // Attach throttled listener
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [children]);

  const marqueeStyle: React.CSSProperties = {
    animation: `marquee ${durationSeconds}s linear infinite`,
  };

  return (
    <div className="marquee-container select-none pointer-events-none" ref={containerRef}>
      <div className="marquee-inner" style={marqueeStyle}>
        {/* Render the text content multiple times */}
        {Array.from({ length: needs }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? textRef : undefined}
            style={{ display: "inline-block" }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}