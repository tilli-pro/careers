"use client";

import { cn } from "~/lib/utils";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  shineOnHover?: boolean;
  children: React.ReactNode;
}

/**
 * @name Shine Border
 * @description It is an animated background border effect component with easy to use and configurable props.
 * @param borderRadius defines the radius of the border.
 * @param borderWidth defines the width of the border.
 * @param duration defines the animation duration to be applied on the shining border
 * @param color a string or string array to define border color.
 * @param className defines the class name to be applied to the component
 * @param children contains react node elements.
 */
export const ShineBorder: React.FC<ShineBorderProps> = ({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  shineOnHover = false,
  children,
}) => {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "group relative min-h-[60px] w-fit place-items-center rounded-[--border-radius] bg-white text-black dark:bg-black dark:text-white",
        className,
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${Array.isArray(color) ? color.join(",") : color},transparent,transparent)`,
          } as React.CSSProperties
        }
        className={cn(
          shineOnHover
            ? [
                "ease-in-out motion-safe:before:animate-shine motion-safe:before:opacity-0 motion-safe:before:transition-all motion-safe:before:duration-1000 motion-safe:before:[animation-duration:var(--duration)] motion-safe:before:[animation-play-state:paused] group-hover:motion-safe:before:opacity-100 group-hover:motion-safe:before:[animation-play-state:running]",
              ]
            : "motion-safe:before:animate-shine",
          `pointer-events-none box-border before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient]`,
        )}
      ></div>
      {children}
    </div>
  );
};
