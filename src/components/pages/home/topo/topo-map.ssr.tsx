import { Suspense } from "react";

import dynamic from "next/dynamic";

import { getServerTheme } from "../../../../features/theme/server-theme";
import { MapProps } from "./topo-map";

const TopoMap = dynamic(() => import("./topo-map"), { ssr: true });

const TopoMapSSR: React.FC<MapProps> = async (props) => {
  const theme = await getServerTheme();

  return (
    <Suspense fallback={<TopoMap {...props} themeOverride={theme} />}>
      <TopoMap themeOverride={theme} {...props} />
    </Suspense>
  );
};

export default TopoMapSSR;
