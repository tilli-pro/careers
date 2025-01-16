"use client";

import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

interface MeteorsProps {
  number?: number;
  color?: string;
  size?: number;
}
export const Meteors = ({
  number = 20,
  color = "#AAAAAA",
  size = 3,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: -5,
      left: 100 - Math.floor(Math.random() * 200) + "%",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={`meteor-${idx.toString()}`}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 rotate-[215deg] animate-meteor rounded-full shadow-[0_0_0_1px_#ffffff10]",
          )}
          style={{ ...style, height: size, width: size, background: color }}
        >
          {/* Meteor Tail */}
          <div
            className="pointer-events-none absolute top-1/2 -z-10 w-[50px] -translate-y-1/2"
            style={{
              height: size / 1.5,
              background: `linear-gradient(to right, ${color}, transparent)`,
            }}
          />
        </span>
      ))}
    </>
  );
};

export default Meteors;
