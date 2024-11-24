import { cn } from "~/lib/utils";

const BasePage: React.FC<React.PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <main
      className={cn(
        "mx-auto flex min-h-[calc(100vh-80px)] max-w-screen-lg flex-col px-2",
        className,
      )}
    >
      {children}
    </main>
  );
};

export default BasePage;