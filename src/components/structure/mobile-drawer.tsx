import Script from "next/script";

import { Menu, X } from "lucide-react";

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
import { cn } from "~/lib/utils";

const mobileDrawerScript = `
const btn = document.getElementById("mobile-drawer-btn");

const observer = new IntersectionObserver(([entry]) => {
  if(entry && (entry.isVisible || entry.isIntersecting)) {
    btn.style.transform = "translateY(-42px)";
  } else {
    btn.style.transform = "translateY(0px)";
  }
}, {
  threshold: 0.4,
});

observer.observe(document.querySelector("footer"));
`;

interface MobileDrawerProps {
  visited?: boolean;
}
const MobileDrawer: React.FC<MobileDrawerProps> = ({ visited }) => {
  return (
    <>
      <Script
        id="mobile-drawer-btn-bottom-handler"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: mobileDrawerScript,
        }}
      />
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            id="mobile-drawer-btn"
            tabIndex={0}
            className={cn(
              "fixed bottom-4 right-4 z-[1000] -translate-y-0 bg-background/60 backdrop-blur-lg transition-transform duration-300",
              !visited && "animate-pulse-once",
            )}
            variant="outline"
          >
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="z-[1001]">
          <DrawerHeader className="relative">
            <DrawerClose className="absolute -top-2 right-2">
              <Button
                asChild
                variant="outline"
                className="h-12 w-12 rounded-full p-3"
              >
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
    </>
  );
};

export default MobileDrawer;
