"use server";

import * as React from "react";

import { ComboBoxProps, Combobox } from "./combobox";
import { Input } from "./input";
import { Skeleton } from "./skeleton";

export const ComboboxSSR: React.FC<ComboBoxProps> = async (props) => {
  return (
    <React.Suspense
      fallback={
        <Skeleton>
          <Input containerClassName="w-[200px]" />
        </Skeleton>
      }
    >
      <Combobox {...props} />
    </React.Suspense>
  );
};
