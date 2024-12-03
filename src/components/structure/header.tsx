import React, { forwardRef } from "react";

import { cookies } from "next/headers";
import Image from "next/image";
import Script from "next/script";

import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { Link } from "next-view-transitions";

import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { ThemeToggleSSR } from "~/features/theme";
import { cn } from "~/lib/utils";

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    titleClassName?: string;
    liClassName?: string;
    noChildrenWrapper?: boolean;
  }
>(
  (
    {
      className,
      title,
      children,
      liClassName,
      titleClassName,
      noChildrenWrapper,
      ...props
    },
    ref,
  ) => {
    return (
      <li className={liClassName}>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            {!!title && (
              <div
                className={cn(
                  "text-sm font-medium leading-none",
                  titleClassName,
                )}
              >
                {title}
              </div>
            )}
            {noChildrenWrapper && children}
            {!noChildrenWrapper && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

const products = [
  {
    name: "✈️ Nudge",
    href: "/product/nudge",
    description: "Supercharge customer engagement, one nudge at a time.",
  },
  {
    name: "🌎 Monay GPS",
    href: "/product/monay",
    description: "The payment stack of the future. Today.",
  },
  {
    name: "🪄 tilliX",
    href: "/product/tillix",
    description: "Consumer experience so good, it feels like magic.",
  },
];

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const Header: React.FC = async () => {
  const cookieStore = await cookies();
  const visited = cookieStore.get("__T_N_VISITOR");

  return (
    <header className="sticky top-0 z-50 w-full bg-background bg-opacity-40">
      <div className="mx-auto flex max-w-screen-lg items-center gap-4 p-3">
        <Link href="/">
          <Image
            src="/tilli-icon.png"
            alt="Tilli Icon"
            width={40}
            height={40}
            className="pointer-events-none h-8 w-8"
          />
        </Link>
        <div className="hidden items-center justify-start gap-4 md:flex">
          <NavigationMenu aria-label="Career Navigation">
            <NavigationMenuList>
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[420px] lg:w-[540px] lg:grid-cols-[.75fr_1fr]">
                    <ListItem
                      href="/tilli"
                      liClassName="col-span-1 row-span-3"
                      className="relative flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/10 to-muted/50 p-6 no-underline outline-none focus:shadow-md"
                      noChildrenWrapper
                    >
                      <div className="z-10 mb-2 mt-4 text-4xl font-medium lowercase tracking-wider">
                        tilli
                      </div>
                      <p className="z-10 text-sm leading-tight text-muted-foreground">
                        Transform The Way You Do Business
                      </p>
                      <Image
                        src="/tilli-bg.jpg"
                        alt="Tilli Background"
                        height="1825"
                        width="1453"
                        className="absolute -top-1 left-0 z-0 h-full w-full rounded object-cover opacity-60 dark:[filter:invert(100%)]"
                      />
                    </ListItem>
                    {products.map(({ name, href, description }) => (
                      <ListItem
                        key={name}
                        href={href}
                        title={name}
                        titleClassName="font-serif font-black"
                      >
                        {description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <Link href="/roles" passHref legacyBehavior>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Open Roles
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto" />
        <ThemeToggleSSR />
      </div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              tabIndex={0}
              className={cn(
                "fixed bottom-4 right-4",
                !visited && "animate-pulse-once",
              )}
              variant="outline"
            >
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="relative">
              <DrawerClose className="absolute -top-2 right-2">
                <Button variant="outline" className="h-10 w-10 rounded-full">
                  <X />
                </Button>
              </DrawerClose>
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-start">
                  <DrawerTitle className="text-left text-2xl">
                    tilli Careers
                  </DrawerTitle>
                  <DrawerDescription>
                    Let's build something together.
                  </DrawerDescription>
                </div>
              </div>
            </DrawerHeader>
            <div className="flex h-[calc(100vh-max(200px,20vh))] w-full flex-col items-center justify-start">
              <DrawerFooter className="w-full text-right text-sm text-primary/50">
                © {new Date().getFullYear()} tilli. All Rights Reserved.
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <Script
        id="header-scroll-effect"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const header = document.querySelector("header");
              window.addEventListener("scroll", function() {
                if (window.scrollY > header.offsetHeight)
                  header.classList.add("bg-background/80", "backdrop-blur-md", "shadow-sm");
                else header.classList.remove("bg-background/80", "backdrop-blur-md", "shadow-sm");
              });
            })();
          `,
        }}
      />
    </header>
  );
};

export default Header;
