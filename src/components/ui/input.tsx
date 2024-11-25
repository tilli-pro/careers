import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  IconLeft?: React.FC;
  IconRight?: React.FC;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, containerClassName, IconLeft, IconRight, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 has-[input:focus-visible]:outline-none has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring has-[input:focus-visible]:ring-offset-2",
          type === "hidden" && "hidden",
          (!!IconLeft || !!IconRight) && "gap-2",
          containerClassName,
        )}
      >
        {!!IconLeft && <IconLeft />}
        <input
          type={type}
          className={cn(
            "box-border flex h-full w-full bg-background outline-none file:mr-2 file:cursor-pointer file:rounded file:border-0 file:bg-secondary file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none",
            type === "file" && "cursor-pointer",
            className,
          )}
          ref={ref}
          {...props}
        />
        {!!IconRight && <IconRight />}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
