import React, { forwardRef } from "react";

import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { cva } from "class-variance-authority";

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

import MobileDrawer from "./mobile-drawer";

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

const ProductTab: React.FC = () => {
  return (
    <NavigationMenuItem>
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
    </NavigationMenuItem>
  );
};

const Header: React.FC = async () => {
  const cookieStore = await cookies();
  const visited = cookieStore.get("__T_N_VISITOR");

  return (
    <>
      <header className="sticky top-0 z-50 w-full will-change-auto">
        <div className="header-blur pointer-events-none absolute inset-0 h-[200%] w-full bg-gradient-to-t from-background/0 to-background/90 backdrop-blur-lg" />
        <div className="relative z-10 mx-auto flex max-w-screen-lg items-center gap-4 p-3">
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
                {/* <ProductTab /> */}

                <NavigationMenuItem>
                  <Link href="/roles" passHref legacyBehavior>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
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
      </header>
      <div className="md:hidden">
        <MobileDrawer visited={!!visited?.value} />
      </div>
    </>
  );
};

export default Header;
