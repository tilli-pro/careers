"use client";

import { useEffect, useRef } from "react";

import { cn } from "~/lib/utils";

import { useTheme } from "../../../../features/theme";

const defaultTransform = "rotateX(0) rotateZ(0) translate3d(0, 0, 0)";

const calculatedZ = [
  10, 36, 70, 108, 139, 160, 164, 142, 90, 0, -136, -320, -564, -640, -700, -710, -700
];

export interface MapProps {
  className?: string;
  gradient?: {
    dark: [string, string];
    light: [string, string];
  };
  themeOverride?: "dark" | "light";
  animateOnId?: string;
}
const TopoMap: React.FC<MapProps> = ({
  className,
  gradient = {
    dark: ["#DDDDDD", "#222222"],
    light: ["#222222", "#DDDDDD"],
  },
  themeOverride
}) => {
  const { theme } = useTheme();
  const islandRef = useRef<SVGSVGElement>(null);
  const mapBorderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollListener = () => {
        let scrollSwap = 5;

        const island = islandRef.current;
        const scroll = window.scrollY;

        const rotX = `75deg`;
        const rotZ = `-75deg`;
        const transY = `${100}px`;
        const transX = `${20}vw`;

        const islandTransform = `rotateX(${rotX}) rotateZ(${rotZ}) translate3d(${transX}, ${transY}, -10vh) scale(0.7)`;
        const islandOpacity = scroll > scrollSwap ? 1 : 0;

        const borderHex = theme === "dark" ? "255" : "0";
        if (island && scroll > scrollSwap) {
          island.style.transform = islandTransform;
          island.style.border = `solid 4px rgba(${borderHex}, ${borderHex}, ${borderHex}, ${islandOpacity})`;
        } else if (island) {
          island.style.transform = defaultTransform;
          island.style.border = `solid 0px rgba(${borderHex}, ${borderHex}, ${borderHex}, 0)`;
        }

        const mapBorder = mapBorderRef.current;
        if (mapBorder && scroll > scrollSwap) {
          mapBorder.style.transform = islandTransform;
        } else if (mapBorder) {
          mapBorder.style.transform = defaultTransform;
        }

        for (let i = 1; i <= 18; i++) {
          const svgEls = document.getElementsByClassName(`l${i}`);
          for (let j = 0; j < svgEls.length; j++) {
            const svgEl = document.getElementById(`layer${i}-${j + 1}`);
            if(svgEl && !svgEl.style.transition) {
              svgEl.style.transition = "all 1s ease-in-out";
              svgEl.style.transformStyle = "preserve-3d";
            }
            if (svgEl && scroll > scrollSwap) {
              const translateZ = calculatedZ[i - 1]!;
              const translateY = 0.15 * translateZ * 4;
              const translateX = -0.633 * translateZ * 4;
              svgEl.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
              svgEl.style.strokeWidth = "12px";
            } else if(svgEl) {
              svgEl.style.transform = "translate3d(0, 0, 0)"
              svgEl.style.strokeWidth = "3px";
            }
          }
        }
      };

      window.addEventListener("scroll", scrollListener);

      return () => window.removeEventListener("scroll", scrollListener);
    }
  }, [theme]);

  return (
    <>
      <div
        id="map-border"
        ref={mapBorderRef}
        className="absolute bottom-0 left-0 right-0 top-0 transition-all duration-1000 will-change-auto"
        style={{ transformStyle: "preserve-3d", transform: defaultTransform }}
      >
        <div
          id="map-top"
          className="absolute left-0 right-0 top-0 h-40 bg-muted opacity-40 transition-all will-change-auto"
          style={{
            transform: "rotateX(-90deg)",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 0",
          }}
        />
        <div
          id="map-bot"
          className="absolute -bottom-40 left-0 right-0 h-40 bg-muted opacity-80 transition-all will-change-auto"
          style={{
            transform: "rotateX(-90deg)",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 0",
          }}
        />
        <div
          id="map-left"
          className="absolute bottom-0 left-0 top-0 w-40 bg-muted opacity-60 transition-all will-change-auto"
          style={{
            transform: "rotateY(90deg)",
            transformStyle: "preserve-3d",
            transformOrigin: "0 50%",
          }}
        />
      </div>
      <svg
        id="island"
        ref={islandRef}
        data-name="island"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2560 1642.9"
        preserveAspectRatio="xMidYMid meet"
        className={cn(
          className,
          "isolate box-border overflow-visible transition-all duration-1000 will-change-auto",
        )}
        style={{ transformStyle: "preserve-3d", transform: defaultTransform }}
      >
        <defs>
          <linearGradient
            id="a"
            x1="241.62"
            y1="-41.8"
            x2="458.79"
            y2="334.35"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={gradient[themeOverride ?? theme][0]} />
            <stop offset="1" stopColor={gradient[themeOverride ?? theme][1]} />
          </linearGradient>
          <linearGradient
            id="b"
            x1="1649.55"
            y1="-115.34"
            x2="2135.88"
            y2="727.01"
            href="#a"
          />
          <linearGradient
            id="c"
            x1="1674.23"
            y1="-76.31"
            x2="2066.24"
            y2="602.67"
            href="#a"
          />
          <linearGradient
            id="d"
            x1="1681.39"
            y1="-62.39"
            x2="2055.75"
            y2="586.03"
            href="#a"
          />
          <linearGradient
            id="e"
            x1="1767.71"
            y1="-82.32"
            x2="2112.63"
            y2="515.11"
            href="#a"
          />
          <linearGradient
            id="f"
            x1="1900.62"
            y1="-134.99"
            x2="2106.48"
            y2="221.58"
            href="#a"
          />
          <linearGradient
            id="g"
            x1="1817.54"
            y1="-33.88"
            x2="1864.07"
            y2="46.71"
            href="#a"
          />
          <linearGradient
            id="h"
            x1="1981.18"
            y1="-24.26"
            x2="2089.03"
            y2="162.55"
            href="#a"
          />
          <linearGradient
            id="i"
            x1="2002.18"
            y1="-9.63"
            x2="2074.52"
            y2="115.66"
            href="#a"
          />
          <linearGradient
            id="j"
            x1="2065.8"
            y1="-11.73"
            x2="2089.44"
            y2="29.21"
            href="#a"
          />
          <linearGradient
            id="k"
            x1="2236.44"
            y1="182.79"
            x2="2734"
            y2="1044.58"
            href="#a"
          />
          <linearGradient
            id="l"
            x1="2292.57"
            y1="234.55"
            x2="2739.71"
            y2="1009.02"
            href="#a"
          />
          <linearGradient
            id="m"
            x1="1817.73"
            y1="326.37"
            x2="1955.57"
            y2="565.12"
            href="#a"
          />
          <linearGradient
            id="n"
            x1="1841.71"
            y1="354.92"
            x2="1951.23"
            y2="544.61"
            href="#a"
          />
          <linearGradient
            id="o"
            x1="1618.22"
            y1="534.37"
            x2="1701.99"
            y2="679.46"
            href="#a"
          />
          <linearGradient
            id="p"
            x1="1484.02"
            y1="587.49"
            x2="1535.67"
            y2="676.95"
            href="#a"
          />
          <linearGradient
            id="q"
            x1="1044.34"
            y1="647.01"
            x2="1182.6"
            y2="886.49"
            href="#a"
          />
          <linearGradient
            id="r"
            x1="1841.44"
            y1="937.19"
            x2="2231.59"
            y2="1612.96"
            href="#a"
          />
          <linearGradient
            id="s"
            x1="1884.86"
            y1="984.55"
            x2="2176.21"
            y2="1489.19"
            href="#a"
          />
          <linearGradient
            id="t"
            x1="1934.97"
            y1="1041.64"
            x2="2121.2"
            y2="1364.2"
            href="#a"
          />
          <linearGradient
            id="u"
            x1="1992.55"
            y1="1148.83"
            x2="2050.39"
            y2="1249.01"
            href="#a"
          />
          <linearGradient
            id="v"
            x1="1664.12"
            y1="-86.74"
            x2="2074.73"
            y2="624.45"
            href="#a"
          />
          <linearGradient
            id="w"
            x1="1657.91"
            y1="-98.56"
            x2="2091.15"
            y2="651.82"
            href="#a"
          />
          <linearGradient
            id="x"
            x1="1983.68"
            y1="-13.86"
            x2="2071.74"
            y2="138.66"
            href="#a"
          />
          <linearGradient
            id="y"
            x1="2038.28"
            y1="-18.86"
            x2="2094.79"
            y2="79.02"
            href="#a"
          />
          <linearGradient
            id="z"
            x1="1905.45"
            y1="-122.5"
            x2="2085.73"
            y2="189.76"
            href="#a"
          />
          <linearGradient
            id="aa"
            x1="1779.05"
            y1="-76.34"
            x2="2109.1"
            y2="495.32"
            href="#a"
          />
          <linearGradient
            id="ab"
            x1="1686.06"
            y1="-49.84"
            x2="2046.76"
            y2="574.91"
            href="#a"
          />
          <linearGradient
            id="ac"
            x1="1204.49"
            y1="107.69"
            x2="2140.1"
            y2="1728.22"
            href="#a"
          />
          <linearGradient
            id="ad"
            x1="932.25"
            y1="-97.85"
            x2="2062.41"
            y2="1859.64"
            href="#a"
          />
          <linearGradient
            id="ae"
            x1="1020.59"
            y1="-87"
            x2="1153.43"
            y2="143.07"
            href="#a"
          />
          <linearGradient
            id="af"
            x1="1105.41"
            y1="116.88"
            x2="2080.87"
            y2="1806.42"
            href="#a"
          />
          <linearGradient
            id="ag"
            x1="1046.02"
            y1="-30.67"
            x2="1109.54"
            y2="79.36"
            href="#a"
          />
          <linearGradient
            id="ah"
            x1="2169.57"
            y1="192.03"
            x2="2690.81"
            y2="1094.84"
            href="#a"
          />
          <linearGradient
            id="ai"
            x1="1874.47"
            y1="959.1"
            x2="2224.64"
            y2="1565.6"
            href="#a"
          />
          <linearGradient
            id="aj"
            x1="1917.41"
            y1="1007.44"
            x2="2154.23"
            y2="1417.62"
            href="#a"
          />
          <linearGradient
            id="ak"
            x1="1949.54"
            y1="1064.76"
            x2="2097.51"
            y2="1321.05"
            href="#a"
          />
          <linearGradient
            id="al"
            x1="1971.04"
            y1="1106.58"
            x2="2074.8"
            y2="1286.3"
            href="#a"
          />
        </defs>
        <path
          id="layer1-1"
          className="a l1 "
          d="M0,98.1c31.9,26.8,74,30.9,94.2,32.8,56.8,5.5,62.1-23.5,114.3-11.7,47,10.6,70.7,37.8,125.1,29.1,47-7.5,56-20.7,102.4-5.9,53.2,17,206.4,124.1,235.7,60.8C683,178.7,577.1,105.7,588.3,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer4-1"
          className="b l4"
          d="M2473.1,0c1,57.8-18.6,109-7.9,166.9,10,54.4,8.4,74-51.3,106.4-67.4,36.6-135.8,14.3-155.9,38.8-23.9,29.2,41.2,142.9,47.5,177.3,15.4,84.3-33.7,86.4-108.8,117.6-56.8,23.7-136.6,60.1-172.9,108.1-31.4,41.6-.2,109-73.3,103.5-23.6-1.7-40.2-22.1-66-20.7s-49,26.9-71.2,36.2c-67.1,28.3-136.6,18.4-204.8-1.4-58.6-16.9-151.6-37.5-199-72.9-105.8-78.7.7-237.9-79.5-315.5-39.4-38.1-122.3-62.5-151-108.4-42.1-67.1,50.1-61.4,102.2-78.1,72.6-23.2,105.5-40.5,124.4-105.3C1419.5,105,1459.2,49.7,1450.5,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer7-1"
          className="c l7"
          d="M1542.6,0c11.1,44.1,16.5,77.6,8.3,122.9-3.7,20.6-13.9,40.8-16.3,61.3-2,16.7,11.6,36.3,3.2,52.5-35.6,69-284.3,42.8-161.8,137.1,38.4,29.6,87.3,57,91.8,107.3,5.4,59.9-68.1,90.9-58.7,152.2,15,97,184.6,155.5,279.6,154.8,75.1-.7,114.9-43.3,162.7-88.5,43.8-41.3,92.4-50.2,149.8-69.9,116.4-39.8,204.1-119.7,182.6-238.9-6.5-35.9-40.2-76.5-21-111.2,29.7-53.8,102.3-29.2,149.3-29.4C2474,249.6,2370.9,107.9,2401,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer8-1"
          className="d l8"
          d="M2381.8,0c-.9,56.7-48.3,91.8-10.9,140.8,30.2,39.6,33.5,94.2-53.1,92.3-58.7-1.3-97.2-16-150.1,14.3-62.3,35.8-59.1,46.7-30.8,96.3,53.7,94.1,6,199.5-97.3,249.8-55.5,26.9-130.2,20.5-180.6,53.2-40.3,26.3-51.4,73.5-95.6,97.4-87.1,47.2-271.3,8.2-322.3-72.4-54.1-85.6,79.6-131.9,53.1-220.8-8.4-28-98-91.4-95.3-110.2,3.8-27.6,93.2-50.9,117.6-60.2,91.6-34.8,46-39.6,52.9-111.6,2.5-25.5,23.6-46.3,26.6-71.7,3.6-29.4-14.1-68.5-22.2-97.2"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer10-1"
          className="e l10"
          d="M2342.3,0c-14.2,30.3-37.2,49.6-36,97.1,1,39.3,34.7,71.6,25.4,87.4-21,35.6-94.6.2-128.3,4.2-49.7,6-103.5,46.5-143.7,71.3-100.1,61.8,53.2,101.3,51.1,186.8-2.8,116-137.5,140.9-237.8,147.3-106.2,6.7-151.5-50.2-235.4-96.9-60.8-34-209-141.3-84.8-189.7,71.1-27.7,183.2,7.2,158.6-99.7-6.6-29.1-25.5-34.5-34.9-56.9-5.8-13.5-5.3-25.4-9.5-36.4-14.4-38.4-38.1-71.2-41-114.5"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer12-1"
          className="f l12"
          d="M2304.8,0c-16.5,35.7-47.3,76.5-45,114.8s-45.6,26.7-87,39.8C2086.7,181.8,1788.1,375.9,1667.2,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer14-1"
          className="g l14"
          d="M1915.6,0c-10.1,56.3-132.5,45.5-156.7,0M1813,0c20.6,9.5,36.1,6,56,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer14-2"
          className="h l14"
          d="M2254.8,0c-2.9,110.3-223.2,192.3-324.5,188.3-47.6-1.9-152.9-40.3-117.3-103.2C1836.9,42.9,1938.4,69,1940.2,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer16-1"
          className="i l16"
          d="M2177.3,0c-9.3,78.9-139.8,148.2-219.7,144.5C1838.5,139,1994.5,61.2,1986.3,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer18-1"
          className="j l18"
          d="M2104.2,0c-2.5,43.6-56,41.3-57.8,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer2-1"
          className="k l2"
          d="M2554.9,0c-14.1,16.2-52.6,71.6-44.1,144.6,6.7,58.4,19.7,77.1,5.3,111.6-6.6,15.7-32,28.2-67.9,42-26.6,10.3-84.4,12.2-104.7,31.2-28.7,26.8,6.1,53.8,19.9,83.3,26.4,56.8,26.6,131-22.1,179.6C2301.6,632,2222,639,2222,697.5c0,37.1,20.8,68.5,13.2,109.9-4.3,23.9-21.9,53.6-15,77.4,10.6,36.3,51.6,40.1,83.3,57.6,33.2,18.4,55.1,45.5,81.2,70.6,97.5,94.2,140.5,114.4,175.3,131.4"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer1-2"
          className="l l1"
          d="M2560,1112c-52.6-16.4-126.5-88.2-165-123.4-67.3-61.2-92.2-97.9-73.6-182.4,10.7-48.7-35.5-104.7-19.4-145.7,17.7-45.2,82.5-66.8,102.5-118.7,14.4-37.1,25.2-100.6,13.6-140.2-16.2-55.2-53.4-56.6,18.8-83.8,55.5-21,103.3-23.3,106.2-87.5,3-67.2-39.7-89.5,16.9-149"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer12-2"
          className="m l12"
          d="M1861.2,320.7c77.2-1.2,183.6,35.9,196,113.3,14.4,89.9-87.7,130.9-170.4,122.6-71.1-7.1-151-41.9-164.8-112.4C1710.3,385,1797.5,324.5,1861.2,320.7Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer13-1"
          className="n l13"
          d="M1892.1,349.5c-90.8,4.4-176.4,80.7-92.3,152.9,30.7,26.4,199,72.8,209.8,1.4,5.5-36.1-147.4.5-105.6-67.1,18.6-30.1,86-4.69,91.3-39.6C2001.2,357.3,1917.7,349.5,1892.1,349.5Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer10-2"
          className="o l10"
          d="M1605.8,546.5c52.2-1.1,199,113.1,90.1,127.8C1641.1,681.8,1545.7,548.3,1605.8,546.5Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer10-3"
          className="p l10"
          d="M1492.9,584.1c37.8-15.7,79.9,70.2,41.9,92.2S1432.6,608.8,1492.9,584.1Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer1-3"
          className="q l1"
          d="M1037.3,663.8c-13.2-.4-35.7,3.3-41.3,16.7-11.1,26.2,4.7,134.2,119.6,143.4,30.4,2.4,28.2,49.8,53.1,54.5,18.7,3.5,40.9-4.7,55.2-20.4,3.1-3.4,19.4-21.3,16.5-41-4.1-28.4-43.2-28.2-94.1-64.4C1085.9,709.5,1079.2,665,1037.3,663.8Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer4-2"
          className="r l4"
          d="M2560,1422.5a330.3,330.3,0,0,0-50-6.1c-92.2-4.4-106.3,33.4-206.7,34.6s-151.2-32.4-202.9-7.9-58.3,35.1-107.7,50.6c-95.5,29.8-215.1-2.8-293-62.5-45.1-34.6-156.8-16.9-159.5-49.5-5-62.3,54.6-101,41.2-158.6a81.1,81.1,0,0,1-1.9-15.9c-6.7-124.5,211.1-288.3,429.6-287.5,111.8.4,207.3,46.1,295.8,106,63.4,42.8,168.3,133.7,255.1,187"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer6-1"
          className="s l6"
          d="M1655.5,1207.7c2.9-135.5,216.4-226.4,375-225.3,151.5,1,253,85.8,327.3,147.9,47,39.3,147.9,175.1,84.5,203.9-74,33.5-126.4,41.1-217.5,46.5-41.6,2.4-43.8-7.3-88.4-4-92,6.8-125.5,51-178,62.5-91.9,19.9-200.9-40-271.5-92.7C1656.6,1323.9,1654.4,1257.6,1655.5,1207.7Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer8-2"
          className="t l8"
          d="M1923.5,1328.2c-77.1,47.2-170.3-74.3-167.2-133.7,3.3-62.8,80.7-94.5,102.7-105.6,47.9-24.3,113.4-38.3,168.9-39.6,63.2-1.6,113.3,22,165.9,51.7,26.3,14.9,102.3,65.2,116.1,99.6,19.7,49.3-13.6,88.5-136.1,80.1C2086.2,1274.7,1975.2,1296.5,1923.5,1328.2Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer11-1"
          className="u l11"
          d="M2115.1,1208.7c95-33.7-154.3-63.2-188.4-18.2,0,0-30.3,33.4,1.7,37.3C1945.8,1230,2097.5,1214.9,2115.1,1208.7Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer6-2"
          className="v l6"
          d="M2417,0c-11.4,92.3,75.4,264-89.2,266.9-46.6.9-109-29-140.3,18.8-18.4,28.1,13.9,108.1,14.6,145.9.8,43.9,20.5,86.6-14.1,119.3s-100.6,63.3-144.7,84.8c-55.7,27.2-115,28.3-163.1,66.7-41.2,32.8-70.6,66.6-124.6,85-97.9,33.6-295.2-11.7-347.4-100.4-57.9-98.4,80.7-185.2-23.6-274.2-28-24-102.4-43.3-91.7-89.1,8.5-36.1,83.8-46.6,116.7-56,77.7-22.2,94.9-37,107.5-110,8.8-51.3,9.3-106.8-2.6-157.7"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer5-1"
          className="w l5"
          d="M1489-.6c6.9,47.7-20.4,99.4-27.1,145.8-7.8,53.8-20.1,75.9-81.9,100.4-44.8,17.7-145.8,26.9-130.7,88.5,11.2,45.9,96.1,77.5,123.4,115.2,36.2,49.9,17.6,79.1,7.7,129.6-10.7,54.1-3,119.9,42.7,158.9,66.6,56.9,231.6,104.3,320.4,82.3,120-29.7,232.4-129.5,340.2-184.8,40.6-20.9,144.4-51.7,171.4-84.9s-7.3-86.2-15.5-125.7c-6.9-33.7-43.8-125.2-2.8-146.1,14.4-7.4,73.8,4.7,90.5,3.4,26.7-1.9,56.9-7.3,80-20.5,66.4-38,35.8-83,31.6-140.3-2.9-40,1.5-81.1,1.8-121.2"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer15-1"
          className="x l15"
          d="M1960.5,0c8.8,73.6-80.1,56.1-106.1,103.8-28.3,52.3,55.1,62,92.5,61.1,112.7-2.5,227.9-71.2,263.5-164.9"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer17-1"
          className="y l17"
          d="M2006.3,0c6.3,36.8-36.6,98.1,10.7,107.3,44.3,8.6,131.3-70,138.8-107.3"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer13-2"
          className="z l13"
          d="M1694.1,0c12.3,116.1,136.7,212.7,260.4,206,76.3-4.1,141.3-35.7,208.9-64.2,76.4-32.3,81.9-78.1,114.4-141.8"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer11-2"
          className="aa l11"
          d="M1647.5,0c14.4,87.2,91,154.9,119.5,236.2,13.7,39.1,9.9,94.1-42.5,99.6s-91.6-39-146.4-16.6c-139.5,57.1,92.4,128.8,124,154.7,38.2,31.5,45.8,72.2,99.4,89.6,40.6,13.2,100.1,12,142.8,6.3,79.2-10.7,133.7-55.7,139.8-110.1,1.5-13.5-.1-28.6-18.2-44.9-14.4-13-3.7-30.2-20.8-50.3-14-16.7-29.2-25.4-34.5-28.9-26.1-16.7-51.1-22.2-86-37.9-50.3-22.6-30.5-28.5,15.7-37.1,105.1-19.6,157.9-94.8,264.4-89,128.5,7,91.5-25.1,85-56.8-4.9-23.9-2.9-66.1,35.2-114.8"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer9-1"
          className="ab l9"
          d="M1599.8,0c12.1,20.2,25.2,61.2,25.7,82,.6,28.7-18.3,40.8-23.9,66.2-11.4,51.4,61.2,68.6,14.9,113.4C1583.2,294,1511.6,281.5,1482,322c-31.5,42.9,5.3,79.3,27.6,115.4,39.6,63.8,10.9,77.1-31.7,118.6s-49.8,75-9.5,123.4c63.5,76.4,229.1,95.5,301.2,21.4,34.1-35.1,45.3-72.2,99-85.6,64.9-16.2,120.4-4,179.2-42.4,53.1-34.6,84.9-94.2,84.9-153.1,0-54.1-63.3-66.6-68.2-107.3-3.9-32,55.9-67,86.4-84.5,57.8-33.2,89-7.3,150.8-7.3,19,.1,52.3.1,63.3-18.6,19.9-33.8-16.1-36.1-25.5-61.1C2322,94.3,2342.7,46.5,2356.8,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer3-1"
          className="ac l3"
          d="M1392.6,0c-22.5,60.5-12.3,142.4-81.7,202.3-83,71.7-213.6,47.3-215.5,95.9-.6,15.4,38,62.8,47.1,72,29.8,30.2,64.4,29.3,102.2,50.9,82.7,47.5,76.9,115.2,87.1,194.2,5.2,39.5,3.7,87.2,21.1,124.3,20.7,44.3,55.7,46.3,101.3,61.5,80.9,26.9,153.4,63.2,236.1,85.4,112.2,30.1-5.2,91.7-56.9,132.7-39.4,31.1-53.1,59.6-67.6,92.8s-13.5,40.8-25.4,95.6c-11,51-17.2,79.7-42.5,95.7-43.7,27.6-104.5-7.9-126,17.9-13.2,15.7-1.4,42.1,1.1,47.5,24.8,55.2,126.4,35,233,75.4s122.7,66.1,195.9,91.1c96.8,33.1,146.9-9.5,327.8-59.4,64.6-17.9,73.8,14.3,140,16.3,84,2.6,157.5-14,290.3-7.3"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer1-4"
          className="ad l1"
          d="M764.5,0a21.3,21.3,0,0,0-2,4.6c-7.4,23.4,27.7,42.2,22.6,72.6-.7,4.4-2.6,15.6-10.9,20.3-16,9.2-41.5-13.6-55-2.4-.5.4-1.5,1.3-3.5,4.4-12.5,19.4-12.6,44.4-12.5,52.8.4,40.7.5,61.1,1.8,64.6,9.6,27.3,31.2,30.3,97.2,70.1,72.9,44,69.6,54.3,106.5,65.5,51.1,15.5,66.8-1.5,92.7,18.4,34.2,26.2,16.5,63.1,52.2,94.8,33.7,30,83.2,26.9,82.5,34.8s-49.5,3.4-58.4,25.9c-3,7.4-.4,14.8.6,17.5,12,34.4,86.7,19,136.4,47.3,80,45.6,24.5,163.8,106.3,235.5,69.4,60.7,176.5,34.6,183.5,75.6,2.9,16.6-12.2,35.8-28.6,56.7-23.6,30.2-43.1,35-51.5,60.7-2.1,6.6-4.2,16.5.3,44.7,12.1,77.1,42.2,96,31.9,130.3-7.2,23.7-30.6,44.6-50,43.7s-53.1-17.8-59.2-43.7h0c0-.1-7.1-58.3-69.6-77.4-64.4-19.8-61.9,92.9-106.2,103.3-92,21.5-102.2,70.6-67.5,128.4,12.4,20.8,36.1,34.6,38.9,36,43.2,22.3,52.9-12.4,338.2,143.8,33,18.1,474.3,219,940.3,35.2,39-14.2,54.3-6.5,138.5,7.5"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer1-5"
          className="ae l1"
          d="M1271.1,0c-10.6,30.4-30.9,84.5-82.8,120.9S1049.6,176.1,987.8,143a165.6,165.6,0,0,1-32.1-23.1c-45.2-41-32.5-73.8-67.6-106.6A112,112,0,0,0,870.8,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer2-2"
          className="af l2"
          d="M1365.8,0c-16.4,54.6-35.5,95.1-49.7,121.6-11.3,21-23.1,39.9-45,57.3a172.7,172.7,0,0,1-44.5,25.3c-40.2,15.8-88.9,21-131.3,11.7-37.4-8.1-90.2-46-128-17.7-14.8,11.1-3.7,27.5-14.1,36.8-3,2.8-21.7,8.7-30.8,15.7-29.9,22.8-4.5,55.3,38.4,71.2,30.9,11.5,77.1-2.3,105.4,15.3,41.9,25.8,10,60.2,32.5,93.9,29.2,43.7,87.9,11.2,128.5,24.8,52.8,17.7,60.2,73,69.8,116.3,20,89.7,9.6,213.1,120.1,247.4,66.8,20.7,210.5,48.7,197.2,135.8-5.6,36.5-58.6,47.4-78.6,122.5-5,18.8-11.7,57-13.4,66.9-17.7,92.3-71.5,157.7-123.5,140.5-49.3-16.2-32.2-60.4-85.8-25.8-20.5,13.2-33,3.8-89.4,15.9-36.8,7.9-47.2,27.9-50,40.3-11.3,49.6,35.8,61.8,188.3,115.5,27.1,9.5,81.5,27.4,169.3,59.9,73.1,27.1,94.4,36.5,124.3,47.2,0,0,123.1,43.9,270.6,53.5,174.4,11.3,186.9-45.1,461.9-67.6a1550.3,1550.3,0,0,1,172,4.6"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer1-6"
          className="ag l1"
          d="M993.3,0c24.8,27.9,43.4,96,86.6,90.6,53.4-6.7,26.4-66.5,55.2-90.6"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer3-2"
          className="ah l3"
          d="M2560,1169.8c-64.8-35.8-396.3-270-396.3-270a232.3,232.3,0,0,1-58.5-53.9,219,219,0,0,1-25.7-44.9c-19.2-44.1-17.4-49.4,18.7-81.9,52.6-47.4,108.7-73.8,174.4-103s88.9-63.6,74.4-129.1c-13.5-61.1-107.8-147.1-19.4-174,68.8-21,166.9-12,169.7-97.5,1.7-49.7-8.3-61.9-7-107.8,1.7-56.2,27.5-69.9,14.4-102.4L2502.3,0"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer5-2"
          className="ai l5"
          d="M2560,1321c-17.8-28.4-52-56.7-72.1-83.9-417.5-538.4-867.5-171.7-874.5-27.1-2.4,50.5-3.4,145.2,26.3,159.8,122.5,60.4,141,105.3,271.1,102.4,27.6-.6,46.4,0,58.3-2.2,50.9-9.5,75.7-35.6,101.5-51.3,73.8-44.9,160.2,27.2,318.7-26.1,123.2-41.4,100.6,11.5,170.7-21.8"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer7-2"
          className="aj l7"
          d="M2396.7,1238.1c-22.4-62.1-198.4-229.1-372.7-225.5-136.5,2.9-310.4,78.8-318,189.6-6.1,90.2,100.8,161.9,119,174,21.4,14.4,68.2,45.8,108.3,32.7,11.9-3.8,20.8-10.9,38.6-24.9,30.2-23.6,41.3-40.4,52-50.4,39.4-36.3,163,5.6,239.1-7.4C2334.7,1314,2414.2,1286.5,2396.7,1238.1Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer9-2"
          className="ak l9"
          d="M2270.8,1199.8c-33.2-67.4-158.3-118.2-235-121.5-70-3.1-241.8,33.4-239.9,122,0,0-10.4,97,162.2,77.9,17.7-1.9,84.5-17.3,139.9-18.3C2191,1258.2,2287,1232.6,2270.8,1199.8Z"
          // transform="translate(0.6 1)"
        />
        <path
          id="layer10-4"
          className="al l10"
          d="M1875,1198.8c24.7-131.4,259.7-66.3,314.9,0,0,0,38.3,31.6-93.3,38.6S1859,1283.6,1875,1198.8Z"
          // transform="translate(0.6 1)"
        />
      </svg>
    </>
  );
};

export default TopoMap;
