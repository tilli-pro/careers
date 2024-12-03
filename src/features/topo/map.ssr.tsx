import { Suspense } from "react";

import dynamic from "next/dynamic";

import { getServerTheme } from "../theme/server-theme";
import { MapProps } from "./map";

const Map = dynamic(() => import("./map"), { ssr: true });

const MapSSR: React.FC<MapProps> = async (props) => {
  const theme = await getServerTheme();

  return (
    <Suspense fallback={<Map {...props} themeOverride={theme} />}>
      <Map themeOverride={theme} {...props} />
    </Suspense>
  );
};

export default MapSSR;
