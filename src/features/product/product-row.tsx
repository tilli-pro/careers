import Link from "next/link";

import AnimatedGridPattern from "~/components/ui/animated-grid-pattern";
import Meteors from "~/components/ui/meteors";
import { ShineBorder } from "~/components/ui/shine-border";
import SpinningSphere from "~/components/ui/sphere";
import { type HexCode, cn } from "~/lib/utils";

import { MonayIcon } from "./icons/monay";
import { NudgeIcon } from "./icons/nudge";

const USE_EXTERNAL_PRODUCT_LINK = true;

interface ProductItemProps {
  name: React.ReactNode;
  slug: string;
  Logo: React.FC<React.SVGAttributes<SVGSVGElement>>;
  description: string;
  background: React.ReactNode;
  // constrain gradient to 2-4 colors
  gradient:
    | [HexCode, HexCode]
    | [HexCode, HexCode, HexCode]
    | [HexCode, HexCode, HexCode, HexCode];
}
const ProductItem: React.FC<ProductItemProps> = ({
  name,
  slug,
  Logo,
  gradient,
  description,
  background,
}) => {
  return (
    <Link
      className="mx-auto box-border w-full max-w-[560px] overflow-hidden rounded-lg shadow-lg lg:mx-0 lg:w-full lg:max-w-none"
      target={USE_EXTERNAL_PRODUCT_LINK ? "_blank" : undefined}
      href={
        USE_EXTERNAL_PRODUCT_LINK
          ? `https://tilli.pro/${slug}`
          : `/product/${slug}`
      }
    >
      <ShineBorder
        className="box-border w-full border-2 border-transparent dark:border-muted"
        shineOnHover
        color={gradient}
        borderWidth={2}
        borderRadius={8}
        duration={24}
      >
        <div className="relative box-border min-h-60 w-full flex-col">
          {!!Logo && (
            <div
              className="absolute bottom-0 right-0 z-0 p-2"
              style={
                {
                  "--icon-color": gradient[0],
                } as React.CSSProperties
              }
            >
              <Logo className="fill-black opacity-15 transition-all duration-1000 group-hover:fill-[var(--icon-color)] group-hover:opacity-100 dark:fill-white" />
            </div>
          )}
          <div className="absolute inset-0 -bottom-2 -left-2 opacity-0 transition-all duration-1000 group-hover:opacity-100">
            {background}
          </div>
          <div className="flex items-center rounded-t-lg">
            <div className="z-10 p-8">
              <div className="h-12 font-tilli text-3xl font-medium">{name}</div>
              <div>
                {description
                  .split(".")
                  .slice(0, -1)
                  .map((part, i) => (
                    <p key={`part-${i.toString()}`}>{part}.</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </ShineBorder>
    </Link>
  );
};

const products: ProductItemProps[] = [
  {
    name: (
      <div className="">
        <span
          className={cn(
            "font-tilli",
            "relative z-10 text-3xl font-medium tracking-[0.075em]",
          )}
        >
          tilli
        </span>
        <span
          className={
            (cn("font-sans"),
            "relative z-0 bg-gradient-to-br from-red-500 to-primary/10 bg-clip-text text-4xl font-bold text-transparent dark:via-primary/80 dark:to-primary")
          }
        >
          X
        </span>
      </div>
    ),
    slug: "tillix",
    Logo: ({ className }) => (
      <div
        className={cn(
          className,
          "h-[30px] w-[30px] text-right font-sans text-[28px] font-black group-hover:text-[var(--icon-color)]",
        )}
      >
        X
      </div>
    ),
    gradient: ["#DC1C13", "#F1959B"],
    description: "Our flagship product. The ultimate digital experience.",
    background: (
      <AnimatedGridPattern
        numSquares={60}
        maxOpacity={0.2}
        duration={2}
        repeatDelay={0.2}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "text-[#F1959B]",
        )}
      />
    ),
  },
  {
    name: (
      <div>
        <span
          className={cn(
            "font-tilli",
            "relative z-10 text-3xl font-medium tracking-[0.075em]",
          )}
        >
          nudge
        </span>
        <span
          className={
            (cn("font-sans"),
            "relative z-0 bg-gradient-to-br from-emerald-500 to-primary/10 bg-clip-text text-4xl font-bold text-transparent dark:via-primary/80 dark:to-primary")
          }
        >
          PRO
        </span>
      </div>
    ),
    slug: "nudge",
    Logo: NudgeIcon,
    gradient: ["#7EE089", "#00AA00"],
    description: "A nudge in time saves nine. Don't ask what that means.",
    background: <Meteors color="#7EE089AA" number={40} size={8} />,
  },
  {
    name: (
      <div>
        <span
          className={cn(
            "font-tilli",
            "relative z-10 text-3xl font-medium tracking-[0.075em]",
          )}
        >
          monay
        </span>
        <span
          className={
            (cn("font-sans"),
            "relative z-0 bg-gradient-to-br from-blue-500 to-primary/10 bg-clip-text text-4xl font-bold text-transparent drop-shadow dark:via-primary/80 dark:to-primary")
          }
        >
          GPS
        </span>
      </div>
    ),
    slug: "monay",
    Logo: MonayIcon,
    gradient: ["#2E69F5", "#4BA4F8"],
    description: "Global payments. Galaxy scale.",
    background: (
      <div className="absolute bottom-4 left-8 scale-[300%] opacity-25">
        <SpinningSphere size={100} />
      </div>
    ),
  },
];

const ProductRow: React.FC = () => {
  return (
    <div className="my-4 box-border flex w-full flex-1 flex-col gap-4 px-2 lg:flex-row lg:items-center lg:justify-between">
      {products.map((product) => (
        <ProductItem key={product.slug} {...product} />
      ))}
    </div>
  );
};

export default ProductRow;
