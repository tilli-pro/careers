import { cn } from "~/lib/utils";

const BasePage: React.FC<
  React.PropsWithChildren & {
    className?: string;
    as?: "main" | "div" | "section";
    id?: string;
  }
> = ({ children, className, as = "main", id }) => {
  const Component = as;

  return (
    <Component
      id={id}
      className={cn(
        "mx-auto flex min-h-[calc(100vh-80px-48px)] max-w-screen-lg flex-col px-2 md:min-h-[calc(100vh-80px-64px)]",
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default BasePage;
