"use client";

import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

interface TwinkleProps {
  number?: number;
  color?: string;
  colors?: string[];
  size?: number;
  className?: string;
}
const Twinkle: React.FC<TwinkleProps> = ({
  number = 30,
  color = "white",
  colors,
  size = 4,
  className,
}) => {
  const [starStyles, setStarStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const effectiveSize = Math.max(1, size) + 2;

    setStarStyles(
      new Array(number).fill(0).map(() => {
        const size = Math.ceil(Math.random() * effectiveSize) + 2;

        return {
          opacity: 0,
          top: Math.floor(Math.random() * 100) + "%",
          left: Math.floor(Math.random() * 100) + "%",
          width: size + "px",
          height: size + "px",
          animationDelay: Math.random() * 1 + 0.2 + "s",
          animationDuration: Math.floor(Math.random() * 6 + 6) + "s",
          color: colors ? colors[Math.floor(Math.random() * colors.length)] : color,
          // color,
          // backgroundColor: color,
          // equilateral triangle clip path
        };
      }),
    );
  }, [number, size, color]);

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {starStyles.map((style, idx) => (
        <svg
          key={`star-${idx.toString()}`}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 122.88 122.88"
          xmlSpace="preserve"
          className="animate-twinkle absolute"
          style={{ ...style }}
        >
          <g>
            <path
              fill={style.color}
              style={{ fillRule: "evenodd", clipRule: "evenodd" }}
              d="M62.43,122.88h-1.98c0-16.15-6.04-30.27-18.11-42.34C30.27,68.47,16.16,62.43,0,62.43v-1.98 c16.16,0,30.27-6.04,42.34-18.14C54.41,30.21,60.45,16.1,60.45,0h1.98c0,16.15,6.04,30.27,18.11,42.34 c12.07,12.07,26.18,18.11,42.34,18.11v1.98c-16.15,0-30.27,6.04-42.34,18.11C68.47,92.61,62.43,106.72,62.43,122.88L62.43,122.88z"
            />
          </g>
        </svg>
      ))}
    </div>
  );
};

export default Twinkle;
