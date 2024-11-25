"use server";

import { Suspense } from "react";

import GradientFC from "./gradient-fc";

const GradientFC_SSR: React.FC<{ className?: string; id: string }> = async ({
  className,
  id,
}) => {
  return (
    <Suspense fallback={<canvas id={id} className={className}></canvas>}>
      <GradientFC className={className} id={id} />
    </Suspense>
  );
};

export default GradientFC_SSR;
