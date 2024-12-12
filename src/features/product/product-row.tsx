import Image from "next/image";

import { ShineBorder } from "~/components/ui/shine-border";
import { type HexCode, cn } from "~/lib/utils";

interface ProductItemProps {
  name: React.ReactNode;
  slug: string;
  logo: string;
  // constrain gradient to 2-4 colors
  gradient:
    | [HexCode, HexCode]
    | [HexCode, HexCode, HexCode]
    | [HexCode, HexCode, HexCode, HexCode];
}
const ProductItem: React.FC<ProductItemProps> = ({
  name,
  slug,
  logo,
  gradient,
}) => {
  return (
    <ShineBorder
      className="mx-auto box-border w-full max-w-[560px] border-2 border-muted lg:mx-0 lg:w-full lg:max-w-none"
      shineOnHover
      color={gradient}
      borderWidth={2}
      borderRadius={8}
      duration={24}
    >
      <div className="box-border flex min-h-56 w-full flex-col">
        <div className="flex items-center p-4">
          <div className="h-12">{name}</div>
        </div>
      </div>
    </ShineBorder>
  );
};

const useTilliXBaseSerif = true;

const products: ProductItemProps[] = [
  {
    name: "Nudge",
    slug: "nudge",
    logo: "nudge-logo.svg",
    gradient: ["#7EE089", "#00AA00"],
  },
  {
    name: "Monay GPS",
    slug: "monay",
    logo: "monay-icon.svg",
    gradient: ["#2E69F5", "#4BA4F8"],
  },
  {
    name: (
      <div className="">
        <span
          className={cn(
            useTilliXBaseSerif ? "font-sans" : "font-serif",
            "relative z-10 text-3xl font-medium drop-shadow-sm",
          )}
        >
          tilli
        </span>
        <span
          className={
            (cn(useTilliXBaseSerif ? "font-serif" : "font-sans"),
            "relative z-0 bg-gradient-to-br from-muted/50 via-primary/50 to-primary bg-clip-text text-4xl font-extrabold text-transparent")
          }
        >
          X
        </span>
      </div>
    ),
    slug: "tillix",
    logo: "",
    gradient: ["#DC1C13", "#F1959B"],
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
